import { authFetch } from '../auth-fetch'
import { GET_EVENT_BY_ID } from '@/constants/api'

/**
 * Fetches event details from the backend using the event ID.
 * Uses the native fetch API instead of axios.
 *
 * @param eventId - ID of the event to retrieve
 * @returns event data if successful, or null if failed
 */
export async function getEventById(eventId: string) {
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
