import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import NavBar from "@/components/NavBar";
import EventCard from "@/components/EventCard";

const BACKEND_URL = "http://127.0.0.1:8082/checkin/events/ongoing";

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
        const response = await fetch(BACKEND_URL);
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

  if (events.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No ongoing events found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "transparent", dark: "transparent" }}
        headerImage={
          <NavBar
            name="Name"
            section="Section"
            onProfilePress={() => console.log("Go to profile")}
            onNotifPress={() => console.log("Header button pressed")}
          />
        }
      >
        <View style={styles.centerWrapper}>
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
                onAttend={() => {
                  console.log("Check-in for event:", item.eventId);
                }}
              />
            )}
            contentContainerStyle={{
              padding: 16,
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: "#27548A",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 200,
    paddingTop: 40,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
    width: "100%",
    minHeight: 0,
  },

  //TOP PART (HEADER) WITH NAME AND SECTION AND NOTIF BUTTON
  NameOfStudent: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  UserSection: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  NOTIFButton: {
    padding: 8,
    backgroundColor: "#fff9f9ff",
    borderRadius: 20,
  },

  TODAYLabel: {
    position: "absolute",
    bottom: 15,
    left: 20,
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  profileIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000030", // optional semi-transparent background
  },

  //MAIN EVENT CARD
  card1: {
    width: "120%",
    height: 320,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
    paddingTop: 12,
  },

  // // MAIN EVENT Card 1 button STYLE AND TEXT STYLES
  // card1Button: {
  //   width: "100%",
  //   marginTop: 12,
  //   paddingVertical: 10,
  //   backgroundColor: "#27548A",
  //   borderRadius: 30,
  //   alignItems: "center",
  // },
  // card1ButtonText: {
  //   color: "#fff",
  //   fontWeight: "bold",
  //   fontSize: 13,
  // },
  // imageBox: {
  //   width: "90%",
  //   height: 170,
  //   backgroundColor: "#d9d9d9",
  //   borderRadius: 12,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // card1TextContainer: {
  //   width: "90%",
  // },
  // card2: {
  //   backgroundColor: "#fff",
  //   borderRadius: 20,
  //   marginBottom: 20,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 8,
  //   elevation: 3,
  //   padding: 16,
  //   width: "120%",
  // },
  // card3: {
  //   backgroundColor: "#fff",
  //   borderRadius: 20,
  //   marginBottom: 20,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 8,
  //   elevation: 3,
  //   padding: 16,
  //   width: "120%",
  // },
});
