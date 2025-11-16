import { useLocalSearchParams } from 'expo-router'
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
import { useEventRegistration } from './hooks/use-event-registration'
import type { Event } from '../../interface/event/event'
import {
    checkLocation,
    fetchEventById,
} from '../../services/event/register-on-event'
import styles from '../../styles/EventRegistrationPage.styles'
import { formatDateTime } from '../../utils/formatDateTime'
import { LocationStatus } from '../../interface/event-registration/event-registration-interface'

/**
 * Event Details and Registration page
 *
 *
 *
 *
 *
 */
export default function EventDetailsRegistrationPage() {
    const { eventId, locationId } = useLocalSearchParams<{
        eventId: string
        locationId: string
    }>()

    const {
        latitude,
        longitude,
        loading,
        locationLoading,
        isPinging,
        lastPingTime,
        register,
    } = useEventRegistration(eventId!, locationId!)

    const [eventData, setEventData] = useState<Event | null>(null)
    const [loadingEvent, setLoadingEvent] = useState(true)
    const fetchEvent = useCallback(async () => {
        if (!eventId) return
        try {
            setLoadingEvent(true)
            const data = await fetchEventById(eventId)
            setEventData(data as Event)
        } catch (error) {
            console.error('Failed to fetch event:', error)
        } finally {
            setLoadingEvent(false)
        }
    }, [eventId])

    const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
        null,
    )
    const [checkingLocation, setCheckingLocation] = useState(false)
    const fetchLocationStatus = useCallback(async () => {
        if (latitude && longitude && locationId) {
            setCheckingLocation(true)
            const res = await checkLocation(locationId, latitude, longitude)
            setLocationStatus(
                res.success
                    ? res.data
                    : { isInside: false, message: res.message },
            )
            setCheckingLocation(false)
        }
    }, [latitude, longitude, locationId])

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await fetchLocationStatus()
        await fetchEvent()
        setRefreshing(false)
    }, [fetchLocationStatus, fetchEvent])

    useEffect(() => {
        fetchEvent()
        fetchLocationStatus()
    }, [fetchEvent, fetchLocationStatus])

    if (loadingEvent) {
        return (
            <ScreenContainer>
                <ActivityIndicator size="large" color="#0000ff" />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer>
            <NavBar title="EVENT DETAILS" />

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
                    {locationLoading ? (
                        <View style={styles.locationLoadingContainer}>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <ThemedText
                                type="default"
                                style={styles.locationLoadingText}
                            >
                                Fetching your location...
                            </ThemedText>
                        </View>
                    ) : (
                        <View style={styles.infoSection}>
                            <ThemedText type="title">
                                Event Registration
                            </ThemedText>
                            <ThemedText type="defaultSemiBold">
                                My Location
                            </ThemedText>
                            {checkingLocation ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#4CAF50"
                                />
                            ) : locationStatus ? (
                                <ThemedText type="defaultSemiBold">
                                    {locationStatus.message}
                                </ThemedText>
                            ) : null}
                        </View>
                    )}

                    {isPinging ? (
                        <View style={styles.pingStatusContainer}>
                            <ActivityIndicator size="small" color="#4CAF50" />
                            <ThemedText
                                type="defaultSemiBold"
                                style={styles.pingStatusText}
                            >
                                Attendance Tracking ACTIVE (pinging every 1 min)
                            </ThemedText>
                            <ThemedText
                                type="defaultSemiBold"
                                style={styles.lastPingText}
                            >
                                Last successful ping:{' '}
                                {lastPingTime || 'just now'}
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
                </View>
            </ScrollView>

            <View style={styles.fixedButtonContainer}>
                <Button
                    title={loading ? 'REGISTERING...' : 'REGISTER'}
                    onPress={register}
                    disabled={
                        loading || locationLoading || !latitude || !longitude
                    }
                />
            </View>
        </ScreenContainer>
    )
}
