import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { attendanceTrackingServiceAPI } from '@/services/attendance/attendance-tracking-service'
import { getEventStatus } from '../_event-status/get-event-status'

interface StartAttendanceTrackingParams {
    eventId: string
    locationId: string
    setIsTracking: (tracking: boolean) => void
    setLatitude: (lat: number) => void
    setLongitude: (lng: number) => void
    setLastTrackingTime: (time: string) => void
}

/**
 * Starts automated attendance tracking with periodic location pings.
 * Only sends pings when the event status is ONGOING.
 *
 * @param params - Configuration for attendance tracking
 * @returns interval ID that can be cleared to stop tracking
 */
export function startAttendanceTracking({
    eventId,
    locationId,
    setIsTracking,
    setLatitude,
    setLongitude,
    setLastTrackingTime,
}: StartAttendanceTrackingParams): ReturnType<typeof setInterval> {
    setIsTracking(true)

    const trackingInterval = setInterval(async () => {
        try {
            // First, check if event is ongoing
            const statusResult = await getEventStatus(eventId)

            if (!statusResult.success || !statusResult.data) {
                console.log('Failed to fetch event status, skipping ping')
                return
            }

            const { eventIsOngoing, eventHasEnded, statusMessage } =
                statusResult.data

            // ff event has ended, don't ping
            if (eventHasEnded) {
                console.log('Event has ended, skipping ping')
                return
            }

            // only ping if event is ongoing
            if (!eventIsOngoing) {
                console.log(
                    `Event not ongoing (${statusMessage}), skipping ping`,
                )
                return
            }

            // event is ongoing, proceed with location ping
            const { status } =
                await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Location permission is required for attendance tracking.',
                )
                return
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            })

            const { latitude, longitude } = location.coords
            setLatitude(latitude)
            setLongitude(longitude)

            await attendanceTrackingServiceAPI(
                eventId,
                locationId,
                latitude,
                longitude,
            )

            const now = new Date()
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            setLastTrackingTime(timeString)
            console.log('Attendance ping successful:', timeString)
        } catch (error: any) {
            console.error(
                'Error during attendance tracking:',
                error.message || error,
            )
        }
    }, 60000) // Every 1 minute

    return trackingInterval
}
