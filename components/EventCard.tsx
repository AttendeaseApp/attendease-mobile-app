import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { ThemedText } from "./ThemedText";

interface EventCardProps {
  eventName: string;
  eventStatus: string;
  startDateTime: string;
  endDateTime: string;
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
  startDateTime,
  endDateTime,
  locationId,
}) => {
  const onAttend = async () => {
    console.log("Navigating to check-in for event:", eventName);
  };

  return (
    <View style={styles.card}>
      <ThemedText type="titleSecondary" fontFamilyOverride="Newsreader">
        {eventName}
      </ThemedText>
      <ThemedText type="default">Status: {eventStatus}</ThemedText>
      <ThemedText type="default">Start: {formatDate(startDateTime)}</ThemedText>
      <ThemedText type="default">End: {formatDate(endDateTime)}</ThemedText>
      {locationId ? (
        <ThemedText type="default">Location: {locationId}</ThemedText>
      ) : null}

      <Button title="CHECK IN" onPress={onAttend} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    gap: 8,
    paddingBlock: 60,
  },
});

export default EventCard;
