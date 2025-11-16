import { StopAttendanceTrackingParams } from '../../../interface/event-registration/event-registration-interface'

/**
 * Stops attendance tracking by setting isTracking to false.
 *
 * @param params - Object containing setIsTracking state setter
 */
export function stopAttendanceTracking({
    setIsTracking,
}: StopAttendanceTrackingParams) {
    setIsTracking(false)
}
