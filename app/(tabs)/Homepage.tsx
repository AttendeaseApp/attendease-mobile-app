import EventCard from "@/components/EventCard";
import { ThemedText } from "@/components/ThemedText";
import { authFetch } from "@/services/authFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";
import {
  RETRIEVE_ONGOING_EVENTS,
  RETRIVE_USER_PROFILE,
} from "../../constants/api";

type Event = {
  eventId: string;
  eventName: string;
  eventStatus: string;
  startDateTime: string;
  endDateTime: string;
  eventLocationId?: string;
  locationId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await authFetch(RETRIEVE_ONGOING_EVENTS);
        if (!eventsResponse.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const profileResponse = await authFetch(RETRIVE_USER_PROFILE);
        if (!profileResponse.ok) throw new Error("Failed to fetch profile");
        const profileData = await profileResponse.json();
        setUser(profileData.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <View style={{ marginBlock: 20 }}>
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
                eventName={item.eventName}
                eventStatus={item.eventStatus}
                startDateTime={item.startDateTime}
                endDateTime={item.endDateTime}
                locationId={item.locationId}
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
