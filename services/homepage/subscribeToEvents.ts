import { IMessage } from '@stomp/stompjs'
import { stompConnect } from '../webSocketAuthentication'
import { Event } from '../../interface/event/event'

let subscription: any = null

/**
 * Subscribe to ongoing homepage events.
 */
export async function subscribeToEvents(callback: (events: Event[]) => void) {
    const wsClient = await stompConnect()

    if (subscription) subscription.unsubscribe()

    subscription = wsClient.subscribe(
        '/topic/homepage-events',
        (message: IMessage) => {
            try {
                const events: Event[] = JSON.parse(message.body)
                callback(events)
            } catch (err) {
                console.error('Failed to parse homepage events', err)
            }
        },
    )

    console.log('Subscribed to homepage events')
    wsClient.publish({
        destination: '/app/homepage-events',
        body: '{}',
    })

    return subscription
}
