import {
    subscribeEventState,
    EventStartStatusResponse,
} from '@/services/event/identify-event-state'

/**
 * Fetches the current state of an event from the backend via WebSocket.
 * Resolves with the first event state update.
 *
 * @param eventId - The ID of the event to check
 * @returns Promise with event status details
 */
export async function getEventStatus(eventId: string): Promise<{
    success: boolean
    data?: EventStartStatusResponse
    message?: string
}> {
    return new Promise((resolve) => {
        let subscription: any = null

        subscribeEventState(eventId, (state) => {
            resolve({
                success: true,
                data: state,
                message: 'Event status fetched successfully',
            })

            subscription?.unsubscribe()
        })
            .then((sub) => {
                subscription = sub
            })
            .catch((error) => {
                console.error('WebSocket subscription failed', error)
                resolve({
                    success: false,
                    message: error.message || 'Failed to fetch event status',
                })
            })
    })
}
