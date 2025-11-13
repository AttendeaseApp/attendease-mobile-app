import {
    REGISTER_STUDENT_ON_EVENT_ENDPOINT,
    CHECK_CURRENT_LOCATION,
    GET_EVENT_BY_ID,
} from '@/constants/api'
import { authFetch } from './auth-fetch'

/**
 * Verifies a student's check-in for an event by sending their location and event details to the server.
 *
 * @param eventId
 * @param locationId
 * @param latitude
 * @param longitude
 * @returns
 */
export async function verifyCheckIn(
    eventId: string,
    locationId: string,
    latitude: number,
    longitude: number,
) {
    try {
        const response = await authFetch(REGISTER_STUDENT_ON_EVENT_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                eventId,
                locationId,
                latitude,
                longitude,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                message: errorData.message || 'Check-in failed',
            }
        }

        const data = await response.json()
        return {
            success: true,
            message: 'Check-in successful!',
            data,
        }
    } catch (error: any) {
        console.error('verifyCheckIn error:', error)
        return {
            success: false,
            message: error.message || 'Network error occurred',
        }
    }
}

export async function checkLocation(
    locationId: string,
    latitude: number,
    longitude: number,
) {
    try {
        const response = await authFetch(CHECK_CURRENT_LOCATION, {
            method: 'POST',
            body: JSON.stringify({ locationId, latitude, longitude }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                message: errorData.message || 'Location check failed',
            }
        }

        const data = await response.json()
        return {
            success: true,
            data, // { isInside: boolean, message: string }
        }
    } catch (error: any) {
        console.error('checkLocation error:', error)
        return {
            success: false,
            message: error.message || 'Network error occurred',
        }
    }
}

/**
 * Fetches event details from the backend using the event ID.
 * Uses the native fetch API instead of axios.
 *
 * @param eventId - ID of the event to retrieve
 * @returns event data if successful, or null if failed
 */
export async function fetchEventById(eventId: string) {
    if (!eventId) return null

    try {
        const response = await authFetch(GET_EVENT_BY_ID(eventId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            console.error(
                'Failed to fetch event:',
                response.status,
                response.statusText,
            )
            return null
        }

        const data = await response.json()
        console.log('Fetched event data:', data)
        return data
    } catch (error) {
        console.error('Error fetching event by ID:', error)
        return null
    }
}
