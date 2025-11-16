import { identifyEventState } from '@/services/event/identify-event-state'

export interface EventStartStatusResponse {
    eventId: string
    eventHasStarted: boolean
    eventIsOngoing: boolean
    eventHasEnded: boolean
    statusMessage: string
}

/**
 * Fetches the current state of an event from the backend.
 * Used to determine if tracking should continue or stop.
 *
 * @param eventId - The ID of the event to check
 * @returns Promise with event status details
 */
export async function getEventStatus(eventId: string): Promise<{
    success: boolean
    data?: EventStartStatusResponse
    message?: string
}> {
    try {
        const response = await identifyEventState(eventId)

        if (!response) {
            return {
                success: false,
                message: 'Failed to fetch event status',
            }
        }

        if (response.success === false) {
            return {
                success: false,
                message: response.message || 'Failed to fetch event status',
            }
        }

        return {
            success: true,
            data: response as EventStartStatusResponse,
            message: 'Event status fetched successfully',
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to fetch event status',
        }
    }
}
