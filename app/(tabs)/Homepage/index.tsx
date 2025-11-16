import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'

// interfaces
import { Event } from '../../../interface/event-sessions/Event'
// styles
import { styles } from '../../../styles/Homepage.styles'
// services
import { fetchHomePageData } from '../../../services/api/home/fetch-home-page-data'
// ui
import EventCard from '../../../components/EventCard'
import { ThemedText } from '../../../components/ThemedText'
import { ScreenContainer } from '../../../components/layouts/CustomScreenContainer'
import NavBar from '../../../components/NavBar'
import CustomRefreshControl from '../../../components/RefreshControl'

/**
 * This is the Home Screen where users can view a list of available events
 * and access the overview of their profile.
 */
export default function HomeScreen() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [user, setUser] = useState<{
        firstName: string
        lastName: string
    } | null>(null)

    useEffect(() => {
        fetchHomePageData(setEvents, setUser, setLoading)
    }, [])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await fetchHomePageData(setEvents, setUser, setLoading)
        setRefreshing(false)
    }, [])

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#27548A" />
            </View>
        )
    }

    return (
        <ScreenContainer>
            <NavBar title="HOME" />

            <View>
                <ThemedText
                    type="subTitleSecondary"
                    fontFamilyOverride="Newsreader"
                >
                    Welcome to Attendease,
                </ThemedText>
                {user && (
                    <ThemedText
                        type="titleSecondary"
                        fontFamilyOverride="Newsreader"
                        style={styles.welcomeMessage}
                    >
                        {user.firstName} {user.lastName}!
                    </ThemedText>
                )}
            </View>

            <ThemedText type="default">
                Browse available events below for you to check in to.
            </ThemedText>

            <View style={styles.cardContainer}>
                <FlatList
                    data={events}
                    keyExtractor={(item, index) =>
                        item.eventId || `event-${index}`
                    }
                    renderItem={({ item }) => (
                        <EventCard
                            eventId={item.eventId}
                            eventName={item.eventName}
                            eventStatus={item.eventStatus}
                            timeInRegistrationStartDateTime={
                                item.timeInRegistrationStartDateTime
                            }
                            startDateTime={item.startDateTime}
                            endDateTime={item.endDateTime}
                            locationId={item.locationId}
                            eventLocation={item.eventLocation}
                        />
                    )}
                    ListEmptyComponent={
                        <ThemedText
                            type="default"
                            style={{ marginTop: 20, textAlign: 'center' }}
                        >
                            No ongoing events at the moment.
                        </ThemedText>
                    }
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <CustomRefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />{' '}
            </View>
        </ScreenContainer>
    )
}
