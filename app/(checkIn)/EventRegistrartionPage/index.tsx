import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenContainer } from "../../../components/CustomScreenContainer";

// hooks
import { useEventCheckIn } from "@/hooks/event-registration/use-event-registration";

/*
 This is the Event Check-In Page where users can check in to an event
 and have their attendance tracked via periodic pings.
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

const styles = StyleSheet.create({
  infoSection: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: { fontSize: 16 },
  locationLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  locationLoadingText: { marginLeft: 8, color: "#666" },
  buttonWrapper: { marginTop: 24 },

  pingStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
  },
  pingStatusText: {
    marginLeft: 10,
    flex: 1,
    color: "#388E3C",
    fontSize: 14,
    fontWeight: "600",
  },
  lastPingText: {
    fontSize: 12,
    marginTop: 4,
    color: "#66BB6A",
    position: "absolute",
    bottom: -16,
    right: 12,
  },
});
