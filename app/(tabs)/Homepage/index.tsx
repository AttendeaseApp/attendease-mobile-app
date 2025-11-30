import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import EventCard from '../../../components/EventCard'
import { ScreenContainer } from '../../../components/layouts/CustomScreenContainer'
import NavBar from '../../../components/NavBar'
import { ThemedText } from '../../../components/ThemedText'
import { Event } from '../../../interface/event/event'
import { retrieveUserProfileForHomepage } from '../../../services/homepage/retrieveUserProfile'
import { styles } from '../../../styles/Homepage.styles'
import { subscribeToEvents } from '../../../services/homepage/subscribeToEvents'

/**
 * This is the Home Screen where users can view a list of available events
 * and access the overview of their profile.
 */
export default function HomeScreen() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<{
        firstName: string
        lastName: string
    } | null>(null)

    useEffect(() => {
        retrieveUserProfileForHomepage(setUser, setLoading)

        let subscription: any
        async function initWebSocket() {
            subscription = await subscribeToEvents(setEvents)
        }

        initWebSocket()

        return () => {
            if (subscription) subscription.unsubscribe()
        }
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
                {events.length === 0 ? (
                    <ThemedText type="default" style={{ marginTop: 20 }}>
                        No ongoing events at the moment.
                    </ThemedText>
                ) : (
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
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </ScreenContainer>
    )
}
