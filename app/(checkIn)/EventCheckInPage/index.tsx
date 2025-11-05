import { ThemedText } from "@/components/ThemedText";
import { pingAttendance } from "@/services/pingAttendanceLogs";
import { verifyCheckIn } from "@/services/verifyCheckIn";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenContainer } from "../../../components/CustomScreenContainer";

export default function EventCheckInPage() {
  const router = useRouter();
  const { eventId, locationId, eventStatus, eventName } = useLocalSearchParams<{
    eventId: string;
    locationId: string;
    eventStatus: string;
    eventName: string;
  }>();

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const parsedEventId = Array.isArray(eventId) ? eventId[0] : eventId;
  const parsedLocationId = Array.isArray(locationId)
    ? locationId[0]
    : locationId;
  const parsedEventStatus = Array.isArray(eventStatus)
    ? eventStatus[0]
    : eventStatus;
  const parsedEventName = Array.isArray(eventName) ? eventName[0] : eventName;

  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);

  useEffect(() => {
    fetchLocation();
    return () => stopPinging();
  }, []);

  const fetchLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required for check-in."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      console.log("Location fetched:", location.coords);
    } catch (error) {
      console.error("Failed to get location", error);
      Alert.alert("Location Error", "Failed to fetch your location.");
    } finally {
      setLocationLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (
      !parsedEventId ||
      !parsedLocationId ||
      latitude === null ||
      longitude === null
    ) {
      Alert.alert("Missing Data", "Cannot proceed with check-in.");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyCheckIn(
        parsedEventId,
        parsedLocationId,
        latitude,
        longitude
      );

      if (result.success) {
        Alert.alert(
          "Check-In Successful",
          "Checked in successfully. Tracking attendance.",
          [{ text: "OK", onPress: startPinging }]
        );
      } else {
        Alert.alert("Check-In Failed", result.message || "Please try again.");
      }
    } catch (error: any) {
      console.error("Check-in error:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const startPinging = () => {
    stopPinging();
    setIsPinging(true);
    const PING_INTERVAL_MS = 60000;

    pingIntervalRef.current = setInterval(async () => {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        console.log("Sending attendance ping:", location.coords);

        await pingAttendance(
          parsedEventId!,
          parsedLocationId!,
          location.coords.latitude,
          location.coords.longitude
        );
      } catch (err) {
        console.warn("Ping failed:", err);
      }
    }, PING_INTERVAL_MS);
  };

  const stopPinging = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
      setIsPinging(false);
      Alert.alert("Tracking Stopped", "Attendance tracking has been stopped.");
    }
  };

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
            Attendance Tracking **ACTIVE** (pinging every 1 min)
          </Text>
          <Text style={styles.lastPingText}>Last successful ping:</Text>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <Text style={styles.label}>Attendance Tracking</Text>
          <ThemedText style={styles.value}>
            **INACTIVE**. Press 'Check In' to begin.
          </ThemedText>
        </View>
      )}

      <View style={styles.buttonWrapper}>
        {isPinging ? (
          <Button title="Stop Tracking" onPress={stopPinging} color="#FF6347" />
        ) : (
          <Button
            title={loading ? "Checking In..." : "Check In"}
            onPress={handleCheckIn}
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
