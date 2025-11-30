import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    View,
} from 'react-native'
import { Button } from '../../components/Button'
import { ScreenContainer } from '../../components/layouts/CustomScreenContainer'
import NavBar from '../../components/NavBar'
import { ThemedText } from '../../components/ThemedText'
import { useAttendanceTracking } from '../../contexts/AttendanceTrackingContext'
import { LocationStatus } from '../../interface/event-registration/event-registration-interface'
import type { Event } from '../../interface/event/event'
import { useEventRegistration } from '../../lib/event-registration/_hooks/use-event-registration'
import { subscribeEventById } from '../../services/event/get-event-by-id'
import {
    sendLocationUpdate,
    subscribeToLocationUpdates,
} from '../../services/event/validate-current-location'
import styles from '../../styles/EventRegistrationPage.styles'
import { formatDateTime } from '../../utils/formatDateTime'
/**
 * Event Details and Registration page
 *
 * Features:
 * - Display event information
 * - Handle event registration
 * - Start/stop attendance tracking (persists across navigation)
 * - Automatically stops tracking when event concludes
 */
export default function EventDetailsRegistrationPage() {
    const router = useRouter()
    const { eventId, locationId, face } = useLocalSearchParams<{
        eventId: string
        locationId: string
        face?: string
    }>()
    const { trackingState, startTracking } = useAttendanceTracking()
    const isTrackingThisEvent =
        trackingState.isTracking && trackingState.eventId === eventId
    const {
        latitude,
        longitude,
        loading,
        locationLoading,
        register: performRegistration,
    } = useEventRegistration(eventId!, locationId!)
    const [eventData, setEventData] = useState<Event | null>(null)
    const [loadingEvent, setLoadingEvent] = useState(true)
    const [hasRegistrationAttempted, setHasRegistrationAttempted] =
        useState(false)
    const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
        null,
    )
    const [refreshing, setRefreshing] = useState(false)
    const fetchEvent = useCallback(async () => {
        if (!eventId) return
        setLoadingEvent(true)
        const subscription = await subscribeEventById(eventId, (data) => {
            console.log('[WS] Event received:', data)
            setEventData(data)
            setLoadingEvent(false)
        })
        return () => subscription.unsubscribe?.()
    }, [eventId])
    useEffect(() => {
        let cleanup: (() => void) | undefined
        fetchEvent().then((unsub) => {
            cleanup = unsub
        })
        return () => cleanup?.()
    }, [fetchEvent])
    useEffect(() => {
        let unsubscribe: any
        async function setup() {
            unsubscribe = await subscribeToLocationUpdates((res) => {
                setLocationStatus({
                    isInside: res.inside,
                    message: res.message,
                })
            })
        }
        setup()
        return () => unsubscribe?.unsubscribe?.()
    }, [])
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 500)
    }, [])
    useEffect(() => {
        if (latitude !== null && longitude !== null && locationId) {
            sendLocationUpdate(locationId, latitude, longitude)
        }
    }, [latitude, longitude, locationId])
    const handleRegister = () => {
        if (locationLoading || latitude === null || longitude === null) {
            console.warn(
                'Cannot register: Location data is still loading or unavailable.',
            )
            return
        }
        setHasRegistrationAttempted(true)
        performRegistration(null, () => startTracking(eventId!, locationId!))
    }
    useEffect(() => {
        if (
            face &&
            latitude !== null &&
            longitude !== null &&
            !loading &&
            !hasRegistrationAttempted
        ) {
            setHasRegistrationAttempted(true)
            performRegistration(face, () =>
                startTracking(eventId!, locationId!),
            )
        }
    }, [
        face,
        performRegistration,
        startTracking,
        eventId,
        locationId,
        latitude,
        longitude,
        loading,
        hasRegistrationAttempted,
    ])
    if (loadingEvent) {
        return (
            <ScreenContainer>
                <ActivityIndicator size="large" color="#2A2C24" />
            </ScreenContainer>
        )
    }
    return (
        <ScreenContainer>
            <NavBar title="DETAILS &amp; REGISTRATION" />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.infoSection}>
                    <ThemedText type="defaultSemiBold">
                        {eventData?.eventStatus || 'N/A'}
                    </ThemedText>
                </View>
                <View style={styles.infoSection}>
                    <ThemedText type="title">
                        {eventData?.eventName || 'N/A'}
                    </ThemedText>
                </View>
                <View style={styles.infoSection}>
                    <ThemedText type="default">Description</ThemedText>
                    <ThemedText type="defaultSemiBold">
                        {eventData?.description || 'N/A'}
                    </ThemedText>
                </View>
                <View style={styles.infoSection}>
                    <ThemedText type="defaultSemiBold">
                        Registration starts at exactly{' '}
                        {formatDateTime(
                            eventData?.timeInRegistrationStartDateTime,
                        )}
                        .
                    </ThemedText>
                    <ThemedText type="defaultSemiBold">
                        The event will then proceed to start on{' '}
                        {formatDateTime(eventData?.startDateTime)} and will end
                        on {formatDateTime(eventData?.endDateTime)}.
                    </ThemedText>
                </View>
                <View style={styles.infoSection}>
                    <ThemedText type="default">Event Venue</ThemedText>
                    {eventData?.eventLocation ? (
                        <ThemedText type="defaultSemiBold">
                            {eventData.eventLocation.locationName || 'N/A'} |{' '}
                            {eventData.eventLocation.locationType || 'N/A'}
                        </ThemedText>
                    ) : (
                        <ThemedText type="defaultSemiBold">N/A</ThemedText>
                    )}
                </View>
                <View style={styles.eventRegistrationInfoSection}>
                    {isTrackingThisEvent ? (
                        <View style={styles.pingStatusContainer}>
                            <ThemedText
                                type="defaultSemiBold"
                                style={styles.pingStatusText}
                            >
                                Attendance Tracking ACTIVE
                            </ThemedText>
                            {trackingState.eventStatus && (
                                <ThemedText
                                    type="default"
                                    style={{
                                        marginTop: 4,
                                        fontSize: 13,
                                        opacity: 0.8,
                                    }}
                                >
                                    {trackingState.eventStatus}
                                </ThemedText>
                            )}
                            <ThemedText
                                type="defaultSemiBold"
                                style={styles.lastPingText}
                            >
                                Last successful ping:{' '}
                                {trackingState.lastTrackingTime ||
                                    'waiting for first ping...'}
                            </ThemedText>
                            <ThemedText type="default">
                                {trackingState.eventStatus?.includes('ongoing')
                                    ? 'Pinging every 5 minutes while event is ongoing.'
                                    : trackingState.eventStatus?.includes(
                                            'not started',
                                        ) ||
                                        trackingState.eventStatus?.includes(
                                            'registration',
                                        )
                                      ? 'Waiting for event to start before sending pings.'
                                      : 'Monitoring event status...'}
                            </ThemedText>
                        </View>
                    ) : (
                        <View style={styles.infoSection}>
                            <ThemedText type="default">
                                Attendance Tracking Status
                            </ThemedText>
                            <ThemedText type="defaultSemiBold">
                                Inactive, click register below to begin.
                            </ThemedText>
                        </View>
                    )}
                    <View style={styles.infoSection}>
                        {locationStatus && (
                            <ThemedText type="defaultSemiBold">
                                {locationStatus.message}
                            </ThemedText>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.fixedButtonContainer}>
                <Button
                    title={loading ? 'REGISTERING...' : 'REGISTER'}
                    onPress={handleRegister}
                    disabled={
                        loading ||
                        locationLoading ||
                        latitude === null ||
                        longitude === null
                    }
                />
            </View>
        </ScreenContainer>
    )
}
