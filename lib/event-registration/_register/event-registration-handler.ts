import { Alert } from 'react-native'
import { RegistrationParams } from '../../../interface/event/registration-params'
import { registerOnEvent } from '../../../services/event/register-on-event'

/**
 * this function handles the user check-in process by verifying their location and event details.
 * It provides feedback via alerts and manages loading state.
 * Supports optional facial verification.
 *
 * @param param0 CheckInParams object containing eventId, locationId, latitude, longitude, setLoading, and onSuccess callback.
 */
export async function eventRegistrationEventHandler({
    eventId,
    locationId,
    latitude,
    longitude,
    faceImageBase64,
    setLoading,
    onSuccess,
}: RegistrationParams) {
    if (!eventId || !locationId || latitude === null || longitude === null) {
        Alert.alert('Missing Data', 'Cannot proceed with check-in.')
        return
    }
    if (faceImageBase64 === null || faceImageBase64 === undefined) {
        console.log('Registering without facial verification.')
    }
    setLoading(true)
    try {
        const result = await registerOnEvent(
            eventId,
            locationId,
            latitude,
            longitude,
            faceImageBase64 || '', // Send empty string if null/undefined; backend ignores if disabled
        )
        if (result.success) {
            Alert.alert('Check-In Successful', 'Tracking started.', [
                { text: 'OK', onPress: onSuccess },
            ])
        } else {
            Alert.alert(
                'Check-In Failed',
                result.message || 'Please try again.',
            )
        }
    } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong.')
    } finally {
        setLoading(false)
    }
}
