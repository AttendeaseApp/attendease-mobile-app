import React from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'

/**
 * this function fetches the user's current location using Expo's Location API.
 * It updates the provided state setters with the latitude and longitude values.
 *
 * @param param0 Object containing state setters for location loading, latitude, and longitude.
 */
export async function getCurrentLocation(
    setLocationLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>,
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>,
) {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'Location permission is required for check-in.',
            )
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
