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
import { getEventStatus } from '../lib/event-registration/_event-status/get-event-status'

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
    const statusCheckIntervalRef = useRef<ReturnType<
        typeof setInterval
    > | null>(null)
    const hasShownEndAlertRef = useRef(false)

    // Monitor event status when tracking is active
    useEffect(() => {
        if (!trackingState.isTracking || !trackingState.eventId) return

        const checkEventStatus = async () => {
            try {
                const result = await getEventStatus(trackingState.eventId!)

                if (result.success && result.data) {
                    const { eventHasEnded, statusMessage } = result.data

                    setTrackingState((prev) => ({
                        ...prev,
                        eventStatus: statusMessage,
                    }))

                    // Stop tracking if event has ended
                    if (eventHasEnded) {
                        stopTracking()

                        // Show alert only once
                        if (!hasShownEndAlertRef.current) {
                            hasShownEndAlertRef.current = true
                            Alert.alert(
                                'Event Concluded',
                                'The event has ended. Attendance tracking has been stopped automatically.',
                                [{ text: 'OK' }],
                            )
                        }
                    }
                }
            } catch (error) {
                console.error('Error checking event status:', error)
            }
        }

        // Check status immediately
        checkEventStatus()

        // Then check every 2 minutes
        statusCheckIntervalRef.current = setInterval(checkEventStatus, 120000)

        return () => {
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current)
            }
        }
    }, [trackingState.isTracking, trackingState.eventId])

    const startTracking = (eventId: string, locationId: string) => {
        hasShownEndAlertRef.current = false

        // Set initial tracking state
        setTrackingState((prev) => ({
            ...prev,
            isTracking: true,
            eventId,
            locationId,
        }))

        // Start the tracking interval
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

        // Reset state
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

    // Cleanup on unmount (app close)
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
