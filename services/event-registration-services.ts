import { verifyCheckIn } from '@/services/verify-event-registration'
import * as Location from 'expo-location'
import React from 'react'
import { Alert } from 'react-native'

// interfaces
import { CheckInParams, PingingParams, StopPingingParams } from '../interface/event-registration/event-registration-interface'

// services
import { pingAttendance } from '@/services/ping-attendance-logs'

/**
 * this function fetches the user's current location using Expo's Location API.
 * It updates the provided state setters with the latitude and longitude values.
 *
 * @param param0 Object containing state setters for location loading, latitude, and longitude.
 */
export async function fetchLocation(
    setLocationLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>,
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>,
) {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location permission is required for check-in.')
            return
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        })

        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
        console.log('Location fetched:', location.coords)
    } catch (error) {
        console.error('Failed to get location', error)
        Alert.alert('Location Error', 'Failed to fetch your location.')
    } finally {
        setLocationLoading(false)
    }
}

/**
 * this function handles the user check-in process by verifying their location and event details.
 * It provides feedback via alerts and manages loading state.
 *
 * @param param0 CheckInParams object containing eventId, locationId, latitude, longitude, setLoading, and onSuccess callback.
 */
export async function handleCheckIn({ eventId, locationId, latitude, longitude, faceImageBase64, setLoading, onSuccess }: CheckInParams) {
    if (!eventId || !locationId || !faceImageBase64 || latitude === null || longitude === null) {
        Alert.alert('Missing Data', 'Cannot proceed with check-in.')
        return
    }
    setLoading(true)
    try {
        const result = await verifyCheckIn(eventId, locationId, latitude, longitude, faceImageBase64)
        if (result.success) {
            Alert.alert('Check-In Successful', result.message || 'Facial verification passed! Tracking started.', [{ text: 'OK', onPress: onSuccess }])
        } else {
            Alert.alert('Check-In Failed', result.message || 'Please try again.')
        }
    } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong.')
    } finally {
        setLoading(false)
    }
}

/**
 * this function starts periodic pinging to log attendance.
 * It sets up an interval to fetch the user's location and send pings every minute.
 *
 * @param param0 PingingParams object containing eventId, locationId, state setters for pinging status, latitude, longitude, and last ping time.
 */
export function startPingingAttendanceLogs({ eventId, locationId, setIsPinging, setLatitude, setLongitude, setLastPingTime }: PingingParams) {
    const PING_INTERVAL_MS = 60000
    setIsPinging(true)

    const interval = setInterval(async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
            })

            const { latitude, longitude } = location.coords
            setLatitude(latitude)
            setLongitude(longitude)

            await pingAttendance(eventId, locationId, latitude, longitude)
            setLastPingTime?.(new Date().toLocaleTimeString())
        } catch (err) {
            console.warn('Ping failed:', err)
        }
    }, PING_INTERVAL_MS)
    return interval
}

/**
 * this function stops the periodic pinging for attendance logging.
 * It updates the pinging state and notifies the user.
 *
 * @param param0 StopPingingParams object containing state setter for pinging status.
 */
export function stopPingingAttendanceLogs({ setIsPinging }: StopPingingParams) {
    setIsPinging(false)
    Alert.alert('Tracking Stopped', 'Attendance tracking has been stopped.')
}
