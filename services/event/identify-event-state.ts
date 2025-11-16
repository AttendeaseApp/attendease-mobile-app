import { authFetch } from '../auth-fetch'
import { GET_EVENT_STATE_STATUS } from '@/constants/api'

/**
 * Used to retrieve event state it must be fetch every 30 seconds
 *
 */
export async function identifyEventState(eventId: string) {
    try {
        const response = await authFetch(GET_EVENT_STATE_STATUS(eventId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            console.error(
                'Failed to fetch event state:',
                response.status,
                response.statusText,
            )
            return null
        }

        const data = await response.json()
        console.log('Fetched event state:', data)
        return data
    } catch (error: any) {
        console.error('Getting event state error:', error)
        return {
            success: false,
            message: error.message || 'Network error occurred',
        }
    }
}
