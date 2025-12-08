import {
    EventStartStatusResponse,
    subscribeEventState,
} from '@/services/event/identify-event-state'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Alert, AppState } from 'react-native'
import { startAttendanceTracking } from '../lib/event-registration/_pings/start-attendance-tracking'
import { stopAttendanceTracking } from '../lib/event-registration/_pings/stop-attendance-tracking'

interface TrackingState {
    isTracking: boolean
    eventId: string | null
    locationId: string | null
    lastTrackingTime: string | null
    eventStatus: string | null
    latitude: number | null
    longitude: number | null
}

interface AttendanceTrackingContextType {
    trackingState: TrackingState
    startTracking: (eventId: string, locationId: string) => void
    stopTracking: () => void
}

const AttendanceTrackingContext = createContext<
    AttendanceTrackingContextType | undefined
>(undefined)

const STORAGE_KEY = '@attendance_tracking_state'

/**
 * Provides global attendance tracking state that persists across navigation.
 * Tracking continues even when user navigates away from the event page.
 */
export function AttendanceTrackingProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [trackingState, setTrackingState] = useState<TrackingState>({
        isTracking: false,
        eventId: null,
        locationId: null,
        lastTrackingTime: null,
        eventStatus: null,
        latitude: null,
        longitude: null,
    })

    const trackingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
        null,
    )
    const subscriptionRef = useRef<any>(null)
    const statusCheckIntervalRef = useRef<ReturnType<
        typeof setInterval
    > | null>(null)
    const hasShownEndAlertRef = useRef(false)
    const appState = useRef(AppState.currentState)

    useEffect(() => {
        const loadState = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY)
                if (saved) {
                    const parsed: TrackingState = JSON.parse(saved)
                    setTrackingState(parsed)
                    if (
                        parsed.isTracking &&
                        parsed.eventId &&
                        parsed.locationId
                    ) {
                        setTimeout(() => {
                            startTracking(parsed.eventId!, parsed.locationId!)
                        }, 100)
                    }
                }
            } catch (error) {
                console.error('Failed to load tracking state:', error)
            }
        }
        loadState()
    }, [])

    useEffect(() => {
        const saveState = async () => {
            try {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(trackingState),
                )
            } catch (error) {
                console.error('Failed to save tracking state:', error)
            }
        }
        if (trackingState.isTracking) {
            saveState()
        }
    }, [trackingState])

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    console.log('App has come to the foreground!')
                    if (
                        trackingState.isTracking &&
                        trackingState.eventId &&
                        trackingState.locationId
                    ) {
                        startTracking(
                            trackingState.eventId,
                            trackingState.locationId,
                        )
                    }
                }
                if (
                    trackingState.isTracking &&
                    nextAppState.match(/background|inactive/)
                ) {
                    console.log('App backgrounded, saving state...')
                }
                appState.current = nextAppState
            },
        )
        return () => subscription?.remove()
    }, [
        trackingState.isTracking,
        trackingState.eventId,
        trackingState.locationId,
    ])
    
    useEffect(() => {
        if (!trackingState.isTracking || !trackingState.eventId) return

        hasShownEndAlertRef.current = false

        subscriptionRef.current = subscribeEventState(
            trackingState.eventId,
            (eventState: EventStartStatusResponse) => {
                setTrackingState((prev) => ({
                    ...prev,
                    eventStatus: eventState.statusMessage,
                }))

                if (eventState.eventHasEnded) {
                    stopTracking()
                    if (!hasShownEndAlertRef.current) {
                        hasShownEndAlertRef.current = true
                        Alert.alert(
                            'Event Concluded',
                            'The event has ended. Attendance tracking has been stopped automatically.',
                            [{ text: 'OK' }],
                        )
                    }
                }
            },
        )

        return () => {
            subscriptionRef.current?.unsubscribe()
            subscriptionRef.current = null
        }
    }, [trackingState.isTracking, trackingState.eventId])

    const startTracking = (eventId: string, locationId: string) => {
        hasShownEndAlertRef.current = false

        setTrackingState((prev) => ({
            ...prev,
            isTracking: true,
            eventId,
            locationId,
        }))

        trackingIntervalRef.current = startAttendanceTracking({
            eventId,
            locationId,
            setIsTracking: (tracking) => {
                setTrackingState((prev) => ({ ...prev, isTracking: tracking }))
            },
            setLatitude: (lat) => {
                setTrackingState((prev) => ({ ...prev, latitude: lat }))
            },
            setLongitude: (lng) => {
                setTrackingState((prev) => ({ ...prev, longitude: lng }))
            },
            setLastTrackingTime: (time) => {
                setTrackingState((prev) => ({
                    ...prev,
                    lastTrackingTime: time,
                }))
            },
        })
    }

    const stopTracking = () => {
        if (trackingIntervalRef.current) {
            clearInterval(trackingIntervalRef.current)
            trackingIntervalRef.current = null
        }
        if (statusCheckIntervalRef.current) {
            clearInterval(statusCheckIntervalRef.current)
            statusCheckIntervalRef.current = null
        }

        stopAttendanceTracking({
            setIsTracking: (tracking) => {
                setTrackingState((prev) => ({
                    ...prev,
                    isTracking:
                        typeof tracking === 'function'
                            ? tracking(prev.isTracking)
                            : tracking,
                }))
            },
        })

        setTrackingState({
            isTracking: false,
            eventId: null,
            locationId: null,
            lastTrackingTime: null,
            eventStatus: null,
            latitude: null,
            longitude: null,
        })
    }

    useEffect(() => {
        return () => {
            if (trackingIntervalRef.current) {
                clearInterval(trackingIntervalRef.current)
            }
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current)
            }
        }
    }, [])

    return (
        <AttendanceTrackingContext.Provider
            value={{
                trackingState,
                startTracking,
                stopTracking,
            }}
        >
            {children}
        </AttendanceTrackingContext.Provider>
    )
}

/**
 * Hook to access global attendance tracking state
 */
export function useAttendanceTracking() {
    const context = useContext(AttendanceTrackingContext)
    if (context === undefined) {
        throw new Error(
            'useAttendanceTracking must be used within AttendanceTrackingProvider',
        )
    }
    return context
}
