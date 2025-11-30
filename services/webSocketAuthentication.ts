import AsyncStorage from '@react-native-async-storage/async-storage'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { WEBSOCKET_BASE_URL } from '@/constants/api'

let wsClient: Client | null = null

/**
 * Returns a connected STOMP WebSocket client
 */
export async function stompConnect(): Promise<Client> {
    if (wsClient && wsClient.connected) return wsClient

    const token = await AsyncStorage.getItem('authToken')
    if (!token) throw new Error('No auth token found')

    wsClient = new Client({
        webSocketFactory: () => new SockJS(WEBSOCKET_BASE_URL),

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        debug: (msg) => console.log('[LOCATION WS DEBUG]', msg),
        reconnectDelay: 5000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 0,
    })

    return new Promise((resolve, reject) => {
        wsClient!.onConnect = () => {
            console.log('Location WebSocket connected')
            resolve(wsClient!)
        }
        wsClient!.onStompError = (frame) => {
            console.error('Location WS ERROR:', frame.headers['message'])
            reject(new Error(frame.headers['message']))
        }

        wsClient!.activate()
    })
}
