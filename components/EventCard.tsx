import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface EventCardProps {
  eventName: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  locationId?: string;
  onAttend?: () => void;
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
  onAttend,
}) => (
  <TouchableOpacity style={styles.card1} activeOpacity={0.8}>
    <View style={styles.card1TextContainer}>
      <Text style={styles.card1Title}>{eventName}</Text>
      <Text style={styles.card1Content}>Status: {eventStatus}</Text>
      <Text style={styles.card1Content}>Start: {formatDate(startDate)}</Text>
      <Text style={styles.card1Content}>End: {formatDate(endDate)}</Text>
      {locationId ? (
        <Text style={styles.card1Content}>Location: {locationId}</Text>
      ) : null}
      <TouchableOpacity style={styles.card1Button} onPress={onAttend}>
        <Text style={styles.card1ButtonText}>Check In</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card1Title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    color: "#27548A",
  },
  card1TextContainer: {
    flex: 1,
  },
  card1: {
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
