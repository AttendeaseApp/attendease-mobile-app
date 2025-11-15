import { PING_ATTENDANCE_ENDPOINT } from '@/constants/api'
import { authFetch } from '@/services/api/auth-fetch'

/**
 * Sends a location ping to the backend for attendance tracking.
 *
 * @param eventId Event ID
 * @param locationId Location ID
 * @param latitude Current latitude
 * @param longitude Current longitude
 */
export async function pingAttendance(
    eventId: string,
    locationId: string,
    latitude: number,
    longitude: number,
) {
    try {
        const payload = {
            eventId,
            locationId,
            latitude,
            longitude,
            timestamp: Date.now(),
        }

        const response = await authFetch(PING_ATTENDANCE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('Ping failed:', errorData)
            throw new Error(errorData?.message || 'Ping request failed')
        }

        const data = await response.text()
        console.log('Ping success:', data)
        return data
    } catch (error: any) {
        console.error('Ping error:', error.message || error)
        throw error
    }
}
