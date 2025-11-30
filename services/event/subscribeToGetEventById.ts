import { IMessage } from '@stomp/stompjs'
import { stompConnect } from '../webSocketAuthentication'
import { Event } from '@/interface/event/event'

/**
 * Subscribe to a specific event's details via WebSocket
 *
 * @param eventId - The ID of the event to fetch
 * @param callback - Callback fired when event data is received
 * @returns STOMP subscription (call unsubscribe() to cancel)
 */
export async function subscribeEventById(
    eventId: string,
    callback: (event: Event) => void,
) {
    const wsClient = await stompConnect()

    const subscription = wsClient.subscribe(
        `/user/queue/events/${eventId}`,
        (message: IMessage) => {
            try {
                const body = JSON.parse(message.body) as Event
                if (body.eventId === eventId) {
                    callback(body)
                }
            } catch (err) {
                console.error('Failed to parse STOMP message', err)
            }
        },
    )

    wsClient.publish({
        destination: `/app/events/${eventId}`,
        body: '{}',
    })

    return subscription
}
