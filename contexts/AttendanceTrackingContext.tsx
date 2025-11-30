import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { Alert } from 'react-native'
import { startAttendanceTracking } from '../lib/event-registration/_pings/start-attendance-tracking'
import { stopAttendanceTracking } from '../lib/event-registration/_pings/stop-attendance-tracking'
import {
    EventStartStatusResponse,
    subscribeEventState,
} from '@/services/event/identify-event-state'

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
