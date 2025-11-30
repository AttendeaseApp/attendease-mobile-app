import { IMessage } from '@stomp/stompjs'
import { stompConnect } from '../webSocketAuthentication'

export interface LocationTrackingResponse {
    inside: boolean
    message: string
}

/**
 * Subscribe to /user/queue/location-tracking for personal responses
 */
export async function subscribeToLocationUpdates(
    callback: (data: LocationTrackingResponse) => void,
) {
    const client = await stompConnect()

    return client.subscribe(
        '/user/queue/location-tracking',
        (message: IMessage) => {
            try {
                const body = JSON.parse(
                    message.body,
                ) as LocationTrackingResponse
                callback(body)
            } catch (e) {
                console.error('Failed to parse location WS message:', e)
            }
        },
    )
}

/**
 * Sends the current location to backend WebSocket controller
 */
export async function sendLocationUpdate(
    locationId: string,
    latitude: number,
    longitude: number,
) {
    const client = await stompConnect()

    client.publish({
        destination: '/app/observe-current-location',
        body: JSON.stringify({
            locationId,
            latitude,
            longitude,
        }),
    })
}
