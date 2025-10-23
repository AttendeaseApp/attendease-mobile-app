import { ThemedText } from "@/components/ThemedText";
import { verifyCheckIn } from "@/services/verifyCheckIn";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EventCheckInPage() {
  const router = useRouter();
  const { eventId, locationId, eventStatus, eventName } = useLocalSearchParams<{
    eventId: string;
    locationId: string;
    eventStatus: string;
    eventName: string;
  }>();

  const [eventIdState, setEventIdState] = useState("");
  const [eventStatusState, setEventStatusState] = useState("");
  const [eventNameState, setEventNameState] = useState("");
  const [locationIdState, setLocationIdState] = useState("");
  const [latitudeState, setLatitudeState] = useState<number | null>(null);
  const [longitudeState, setLongitudeState] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    if (eventId) setEventIdState(Array.isArray(eventId) ? eventId[0] : eventId);
    if (eventStatus)
      setEventStatusState(
        Array.isArray(eventStatus) ? eventStatus[0] : eventStatus
      );
    if (eventName)
      setEventNameState(Array.isArray(eventName) ? eventName[0] : eventName);
    if (locationId)
      setLocationIdState(
        Array.isArray(locationId) ? locationId[0] : locationId
      );
  }, [eventId, eventStatus, eventName, locationId]);

  useEffect(() => {
    fetchLocation();
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
        setLocationLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLatitudeState(location.coords.latitude);
      setLongitudeState(location.coords.longitude);
      console.log("Location fetched:", {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    } catch (error) {
      console.error("Failed to get location", error);
      Alert.alert("Location Error", "Failed to fetch your location.");
    } finally {
      setLocationLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (
      !eventIdState ||
      !locationIdState ||
      latitudeState === null ||
      longitudeState === null
    ) {
      Alert.alert(
        "Missing Data",
        "Cannot proceed with check-in. Missing required information."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await verifyCheckIn(
        eventIdState,
        locationIdState,
        latitudeState,
        longitudeState
      );

      if (result.success) {
        Alert.alert(
          "Check-In Successful",
          result.message || "Checked in successfully!",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
      } else {
        Alert.alert(
          "Check-In Failed",
          result.message || "Check-in failed. Please try again.",
          [{ text: "OK" }]
        );
      }
    } catch (error: any) {
      console.error("Check-in error:", error);
      Alert.alert(
        "Error",
        error.message ||
          "Something went wrong during check-in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Event Check-In</Text>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Event Name</Text>
          <ThemedText type="default" style={styles.value}>
            {eventNameState || "N/A"}
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Event ID</Text>
          <ThemedText type="default" style={styles.value}>
            {eventIdState}
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Status</Text>
          <ThemedText type="default" style={styles.value}>
            {eventStatusState}
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Location ID</Text>
          <ThemedText type="default" style={styles.value}>
            {locationIdState}
          </ThemedText>
        </View>

        {locationLoading ? (
          <View style={styles.locationLoadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text style={styles.locationLoadingText}>
              Fetching your location...
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.infoSection}>
              <Text style={styles.label}>📍 Your Latitude</Text>
              <ThemedText type="default" style={styles.value}>
                {latitudeState?.toFixed(6) || "N/A"}
              </ThemedText>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.label}>📍 Your Longitude</Text>
              <ThemedText type="default" style={styles.value}>
                {longitudeState?.toFixed(6) || "N/A"}
              </ThemedText>
            </View>
          </>
        )}

        <View style={styles.buttonWrapper}>
          <Button
            title={loading ? "Checking In..." : "Check In"}
            onPress={handleCheckIn}
            disabled={
              loading ||
              locationLoading ||
              !eventIdState ||
              !locationIdState ||
              latitudeState === null ||
              longitudeState === null
            }
            color="#007AFF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 16,
    backgroundColor: "white",
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
  value: {
    fontSize: 16,
  },
  locationLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  locationLoadingText: {
    marginLeft: 8,
    color: "#666",
  },
  buttonWrapper: {
    marginTop: 24,
  },
});
