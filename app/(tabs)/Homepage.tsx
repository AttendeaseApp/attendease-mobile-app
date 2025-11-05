import EventCard from "@/components/EventCard";
import { ThemedText } from "@/components/ThemedText";
import { fetchHomePageData } from "@/services/fetch-home-page-data";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";

import { Event } from "@/types/event-sessions/Event";

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  useEffect(() => {
    fetchHomePageData(setEvents, setUser, setLoading);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#27548A" />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <NavBar title="HOME" />
      <View>
        <ThemedText type="subTitleSecondary" fontFamilyOverride="Newsreader">
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
            keyExtractor={(item, index) => item.eventId || `event-${index}`}
            renderItem={({ item }) => (
              <EventCard
                eventId={item.eventId}
                eventName={item.eventName}
                eventStatus={item.eventStatus}
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
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: "100%",
  },
  welcomeMessage: {
    fontSize: 45,
    lineHeight: 45,
  },
});
