import { verifyFaceForCheckIn } from "@/services/verifyFaceForCheckIn";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { authFetch } from "@/services/authFetch";

export default function FaceVerificationScreen() {
  const router = useRouter();
  const { eventId, eventName, locationId, startDateTime, endDateTime } =
    useLocalSearchParams<{
      eventId: string;
      eventName: string;
      locationId: string;
      startDateTime: string;
      endDateTime: string;
    }>();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);

  const captureAndVerify = async () => {
    if (!cameraRef.current) {
      Alert.alert("Camera not ready");
      return;
    }

    setLoading(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });

      const result = await verifyFaceForCheckIn(
        photo.base64!,
        eventId!,
        locationId!,
        parseFloat(startDateTime!),
        parseFloat(endDateTime!)
      );

      if (result.success) {
        Alert.alert(
          "Success",
          result.message || "Face verified and checked in!"
        );
        router.back();
      } else {
        Alert.alert(
          "Verification Failed",
          result.message || "Face did not match. Please try again."
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Capture Error",
        error.message || "Failed to capture image. Try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera for face verification.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />
      <View style={styles.overlay}>
        <Text style={styles.instructionText}>
          Position your face in the frame and tap Verify to check in for{" "}
          {eventName}.
        </Text>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Verify & Check In" onPress={captureAndVerify} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  instructionText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
