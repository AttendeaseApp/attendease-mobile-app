import { Alert } from 'react-native'
import { CheckInParams } from '../../../interface/event-registration/event-registration-interface'
import { verifyCheckIn } from '../../../services/verify-event-registration'

/**
 * this function handles the user check-in process by verifying their location and event details.
 * It provides feedback via alerts and manages loading state.
 *
 * @param param0 CheckInParams object containing eventId, locationId, latitude, longitude, setLoading, and onSuccess callback.
 */
export async function eventRegistrationEventHandler({
    eventId,
    locationId,
    latitude,
    longitude,
    setLoading,
    onSuccess,
}: CheckInParams) {
    if (!eventId || !locationId || latitude === null || longitude === null) {
        Alert.alert('Missing Data', 'Cannot proceed with check-in.')
        return
    }

    setLoading(true)
    try {
        const result = await verifyCheckIn(
            eventId,
            locationId,
            latitude,
            longitude,
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
