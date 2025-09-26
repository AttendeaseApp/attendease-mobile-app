import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { ThemedText } from "./ThemedText";

interface EventCardProps {
  eventName: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  locationId?: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString();
}

const EventCard: React.FC<EventCardProps> = ({
  eventName,
  eventStatus,
  startDate,
  endDate,
  locationId,
}) => {
  const onAttend = async () => {
    console.log("Navigating to check-in for event:", eventName);
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardInfoContainer}>
        <ThemedText type="title">{eventName}</ThemedText>
        <ThemedText type="default">Status: {eventStatus}</ThemedText>
        <ThemedText type="default">Start: {formatDate(startDate)}</ThemedText>
        <ThemedText type="default">End: {formatDate(endDate)}</ThemedText>
        {locationId ? (
          <ThemedText type="default">Location: {locationId}</ThemedText>
        ) : null}

        <Button title="CHECK IN" onPress={onAttend} />

        <TouchableOpacity style={styles.card1Button} onPress={onAttend}>
          <ThemedText type="default">CHECK IN</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardInfoContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    flexDirection: "column",
    alignItems: "stretch",
    padding: 16,
    width: "100%",
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: "center",
  },
  card1Button: {
    backgroundColor: "#27548A",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  card1ButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  card1Content: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
});

export default EventCard;
