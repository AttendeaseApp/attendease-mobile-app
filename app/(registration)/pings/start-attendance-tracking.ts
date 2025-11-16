import * as Location from 'expo-location'
import { AttendanceTrackingParams } from '../../../interface/event-registration/event-registration-interface'
import { attendanceTrackingServiceAPI } from '../../../services/attendance/attendance-tracking-service'

/**
 * this function starts periodic pinging to log attendance.
 * It sets up an interval to fetch the user's location and send pings every minute.
 *
 * @param param0 PingingParams object containing eventId, locationId, state setters for pinging status, latitude, longitude, and last ping time.
 */
export function startAttendanceTracking({
    eventId,
    locationId,
    setIsTracking,
    setLatitude,
    setLongitude,
    setLastTrackingTime,
}: AttendanceTrackingParams) {
    const PING_INTERVAL_MS = 60000
    setIsTracking(true)

    const interval = setInterval(async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
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
            setLastTrackingTime?.(new Date().toLocaleTimeString())
        } catch (err) {
            console.warn('Attendance tracking failed:', err)
        }
    }, PING_INTERVAL_MS)
    return interval
}
