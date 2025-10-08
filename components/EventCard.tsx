import { useRouter } from "expo-router";
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
  eventId: string; // Add eventId for verification
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
  const router = useRouter();

  const onAttend = () => {
    router.push({
      pathname: "../../(facial)/FacialVerificationScreen",
      params: {
        eventName,
        locationId: locationId || "",
        startDateTime,
        endDateTime,
      },
    });
  };

  return (
    <View style={styles.card}>
      <ThemedText type="default">Event Status: {eventStatus}</ThemedText>
      <ThemedText type="titleSecondary" fontFamilyOverride="Newsreader">
        {eventName}
      </ThemedText>

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
    gap: 10,
    paddingBlock: 20,
  },
});

export default EventCard;
