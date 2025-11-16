import { Alert } from 'react-native'
import { StopAttendanceTrackingParams } from '../../../interface/event-registration/event-registration-interface'

/**
 * this function stops the periodic pinging for attendance logging.
 * It updates the pinging state and notifies the user.
 *
 * @param param0 StopPingingParams object containing state setter for pinging status.
 */
export function stopAttendanceTracking({
    setIsTracking,
}: StopAttendanceTrackingParams) {
    setIsTracking(false)
    Alert.alert('Tracking Stopped', 'Attendance tracking has been stopped.')
}
