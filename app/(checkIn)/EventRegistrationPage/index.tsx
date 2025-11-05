import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ScreenContainer } from "../../../components/CustomScreenContainer";

// hooks
import { useEventCheckIn } from "@/hooks/event-registration/use-event-registration";

// styles
import { styles } from "@/styles/EventRegistrationPage.styles";

// ui
import NavBar from "../../../components/NavBar";

/**
 * Event Check-In Page where users can check in to an event and have their attendance tracked via periodic pings.
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
  } = useEventCheckIn(parsedEventId!, parsedLocationId!);

  return (
    <ScreenContainer>
      <View>
        <NavBar title="EVENT DETAILS" />
      </View>

      {[
        { label: "Event Name", value: parsedEventName },
        { label: "Status", value: parsedEventStatus },
      ].map(({ label, value }) => (
        <View key={label} style={styles.infoSection}>
          <ThemedText type="default" colorVariant="black">
            {label.toUpperCase()}
          </ThemedText>
          <ThemedText type="defaultSemiBold">{value || "N/A"}</ThemedText>
        </View>
      ))}

      {locationLoading ? (
        <View style={styles.locationLoadingContainer}>
          <ActivityIndicator size="small" color="#000000ff" />
          <ThemedText type="default" style={styles.locationLoadingText}>
            Fetching your location...
          </ThemedText>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <ThemedText type="default">MY CURRENT LOCATION</ThemedText>

          <ThemedText type="default">
            LATITUDE: {latitude?.toFixed(6) || "N/A"}{" "}
          </ThemedText>

          <ThemedText type="default">
            LONGITUDE: {longitude?.toFixed(6) || "N/A"}
          </ThemedText>
        </View>
      )}

      {isPinging ? (
        <View style={styles.pingStatusContainer}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <ThemedText type="default" style={styles.pingStatusText}>
            Attendance Tracking ACTIVE (pinging every 1 min)
          </ThemedText>
          <ThemedText type="default" style={styles.lastPingText}>
            Last successful ping: {lastPingTime || "just now"}
          </ThemedText>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <ThemedText type="default">Attendance Tracking Status</ThemedText>
          <ThemedText type="default">
            INACTIVE. Press REGISTER to begin.
          </ThemedText>
        </View>
      )}

      <View style={styles.buttonWrapper}>
        <Button
          title={loading ? "REGISTERING..." : "REGISTER"}
          onPress={checkIn}
          disabled={loading || locationLoading || !latitude || !longitude}
        />
      </View>
    </ScreenContainer>
  );
}
