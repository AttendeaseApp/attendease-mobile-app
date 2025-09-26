import EventCard from "@/components/EventCard";
import NavBar from "@/components/NavBar";
import { ThemedText } from "@/components/ThemedText";
import { authFetch } from "@/services/authFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import { RETRIEVE_ONGOING_EVENTS } from "../../constants/api";

type Event = {
  eventId: string;
  eventName: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  eventLocationId?: string;
  locationId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOngoingEvents = async () => {
      try {
        const response = await authFetch(RETRIEVE_ONGOING_EVENTS);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingEvents();
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
      <NavBar />
      <View style={styles.centerWrapper}>
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
                startDate={item.startDate}
                endDate={item.endDate}
                locationId={item.locationId}
              />
            )}
            contentContainerStyle={{
              padding: 16,
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
