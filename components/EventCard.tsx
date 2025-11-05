import { EventCardProps } from "@/types/event-sessions/EventCardProps";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { ThemedText } from "./ThemedText";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString();
}

const EventCard: React.FC<EventCardProps> = ({
  eventId,
  eventName,
  eventStatus,
  startDateTime,
  endDateTime,
  eventLocation,
}) => {
  const router = useRouter();

  const onAttend = () => {
    router.push({
      pathname: "../../(checkIn)/EventRegistrationPage",
      params: {
        eventId,
        eventName,
        eventStatus,
        startDateTime,
        endDateTime,
        locationId: eventLocation.locationId,
      },
    });
  };

  return (
    <View style={styles.card}>
      <ThemedText type="default">{eventStatus}</ThemedText>
      <ThemedText type="title" fontFamilyOverride="AfacadFlux">
        {eventName}
      </ThemedText>

      <ThemedText type="default">Start: {formatDate(startDateTime)}</ThemedText>
      <ThemedText type="default">End: {formatDate(endDateTime)}</ThemedText>

      {eventLocation ? (
        <ThemedText type="default">
          Location: {eventLocation.locationName}
        </ThemedText>
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
    gap: 10,
    paddingBlock: 20,
  },
});

export default EventCard;
