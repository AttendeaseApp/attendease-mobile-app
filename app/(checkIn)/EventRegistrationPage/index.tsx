import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { ScreenContainer } from "../../../components/CustomScreenContainer";

// hooks
import { useEventCheckIn } from "@/hooks/event-registration/use-event-registration";

// styles
import { styles } from "@/styles/EventRegistrationPage.styles";

/**
 * This is the Event Check-In Page where users can check in to an event and have their attendance tracked via periodic pings.
 *
 * @returns JSX.Element representing the Event Check-In Page.
 */
export default function EventCheckInPage() {
  const { eventId, locationId, eventStatus, eventName } = useLocalSearchParams<{
    eventId: string;
    locationId: string;
    eventStatus: string;
    eventName: string;
  }>();

  const parsedEventId = Array.isArray(eventId) ? eventId[0] : eventId;
  const parsedLocationId = Array.isArray(locationId)
    ? locationId[0]
    : locationId;
  const parsedEventStatus = Array.isArray(eventStatus)
    ? eventStatus[0]
    : eventStatus;
  const parsedEventName = Array.isArray(eventName) ? eventName[0] : eventName;

  const {
    latitude,
    longitude,
    loading,
    locationLoading,
    isPinging,
    lastPingTime,
    checkIn,
    stopPinging,
  } = useEventCheckIn(parsedEventId!, parsedLocationId!);

  return (
    <ScreenContainer>
      {[
        { label: "Event Name", value: parsedEventName },
        { label: "Status", value: parsedEventStatus },
      ].map(({ label, value }) => (
        <View key={label} style={styles.infoSection}>
          <Text style={styles.label}>{label}</Text>
          <ThemedText style={styles.value}>{value || "N/A"}</ThemedText>
        </View>
      ))}

      {locationLoading ? (
        <View style={styles.locationLoadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.locationLoadingText}>
            Fetching your location...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.infoSection}>
            <Text style={styles.label}>Latitude</Text>
            <ThemedText style={styles.value}>
              {latitude?.toFixed(6) || "N/A"}
            </ThemedText>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.label}>Longitude</Text>
            <ThemedText style={styles.value}>
              {longitude?.toFixed(6) || "N/A"}
            </ThemedText>
          </View>
        </>
      )}

      {isPinging ? (
        <View style={styles.pingStatusContainer}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <Text style={styles.pingStatusText}>
            Attendance Tracking ACTIVE (pinging every 1 min)
          </Text>
          <Text style={styles.lastPingText}>
            Last successful ping: {lastPingTime || "just now"}
          </Text>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <Text style={styles.label}>Attendance Tracking</Text>
          <ThemedText style={styles.value}>
            INACTIVE. Press 'Check In' to begin.
          </ThemedText>
        </View>
      )}

      <View style={styles.buttonWrapper}>
        {isPinging ? (
          <Button title="Stop Tracking" onPress={stopPinging} color="#FF6347" />
        ) : (
          <Button
            title={loading ? "Checking In..." : "Check In"}
            onPress={checkIn}
            disabled={loading || locationLoading || !latitude || !longitude}
            color="#007AFF"
          />
        )}
      </View>
    </ScreenContainer>
  );
}
