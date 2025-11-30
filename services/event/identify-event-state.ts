import { IMessage } from '@stomp/stompjs'
import { stompConnect } from '../webSocketAuthentication'

export interface EventStartStatusResponse {
    eventId: string
    eventHasStarted: boolean
    eventIsOngoing: boolean
    eventHasEnded: boolean
    statusMessage: string
}

/**
 * Subscribe to a specific event's state updates
 */
export async function subscribeEventState(
    eventId: string,
    callback: (state: EventStartStatusResponse) => void,
) {
    const wsClient = await stompConnect()

    const subscription = wsClient.subscribe(
        '/topic/read-event-state',
        (message: IMessage) => {
            try {
                const body = JSON.parse(
                    message.body,
                ) as EventStartStatusResponse
                if (body.eventId === eventId) {
                    callback(body)
                }
            } catch (err) {
                console.error('Failed to parse STOMP message', err)
            }
        },
    )

    wsClient.publish({
        destination: `/app/observe-event-state/${eventId}`,
        body: '{}',
    })

    return subscription
}
