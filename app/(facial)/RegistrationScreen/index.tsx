import { registerFaceEncoding } from "@/services/registerFaceEncoding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const REQUIRED_IMAGES = 3;
const router = useRouter();

export default function FaceRegisterScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!storedToken);
    })();
  }, []);

  const getInstructionText = () => {
    if (currentStep === 0) return "Face forward - Look directly at camera";
    if (currentStep === 1) return "Turn slightly left";
    if (currentStep === 2) return "Turn slightly right";
    return "Capture complete";
  };

  const captureImage = async () => {
    if (!cameraRef.current || isProcessing) return;

    if (!isLoggedIn) {
      Alert.alert(
        "Authentication required",
        "Please login to register your face."
      );
      return;
    }

    setIsProcessing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo) {
        Alert.alert("Error", "Failed to capture image");
        setIsProcessing(false);
        return;
      }

      // Add captured image to array
      const newImages = [...capturedImages, photo.uri];
      setCapturedImages(newImages);
      setCurrentStep(currentStep + 1);

      // If we have enough images, send them
      if (newImages.length >= REQUIRED_IMAGES) {
        await sendImagesToServer(newImages);
      } else {
        // Provide feedback and prepare for next capture
        Alert.alert(
          "Image Captured",
          `${
            newImages.length
          }/${REQUIRED_IMAGES} images captured. ${getInstructionText()}`,
          [{ text: "OK" }]
        );
      }
    } catch (error: any) {
      console.error("Face capture error:", error);
      Alert.alert("Error", error.message || "Failed to capture image");
    } finally {
      setIsProcessing(false);
    }
  };

  const sendImagesToServer = async (images: string[]) => {
    setIsProcessing(true);
    try {
      const result = await registerFaceEncoding(images);

      if (result.success) {
        Alert.alert(
          "Success",
          result.message ?? "Face registered successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                router.replace("/(tabs)/Homepage");

                setCapturedImages([]);
                setCurrentStep(0);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Registration Failed",
          result.message ?? "Face registration failed. Please try again.",
          [
            {
              text: "Retry",
              onPress: () => {
                setCapturedImages([]);
                setCurrentStep(0);
              },
            },
          ]
        );
      }
    } catch (error: any) {
      console.error("Face registration error:", error);
      Alert.alert(
        "Error",
        error.message || "Something went wrong during face registration.",
        [
          {
            text: "Retry",
            onPress: () => {
              setCapturedImages([]);
              setCurrentStep(0);
            },
          },
        ]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCapture = () => {
    setCapturedImages([]);
    setCurrentStep(0);
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera access is required to register your face
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front" ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>{getInstructionText()}</Text>
            <Text style={styles.progressText}>
              {capturedImages.length}/{REQUIRED_IMAGES} images captured
            </Text>
          </View>

          {/* Face frame guide */}
          <View style={styles.faceFrame} />

          {/* Progress indicators */}
          <View style={styles.progressIndicators}>
            {[...Array(REQUIRED_IMAGES)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index < capturedImages.length && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>
      </CameraView>

      <View style={styles.controls}>
        {capturedImages.length > 0 &&
          capturedImages.length < REQUIRED_IMAGES && (
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={resetCapture}
              disabled={isProcessing}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          )}

        <TouchableOpacity
          style={[
            styles.button,
            (isProcessing || capturedImages.length >= REQUIRED_IMAGES) &&
              styles.buttonDisabled,
          ]}
          onPress={captureImage}
          disabled={isProcessing || capturedImages.length >= REQUIRED_IMAGES}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {capturedImages.length === 0
                ? "Start Registration"
                : `Capture Image ${capturedImages.length + 1}`}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.helpText}>
          {capturedImages.length === 0
            ? "You'll need to capture 3 images from different angles"
            : capturedImages.length < REQUIRED_IMAGES
            ? "Follow the instructions for each capture"
            : "Processing your images..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionBox: {
    position: "absolute",
    top: 60,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 16,
    borderRadius: 12,
    minWidth: 280,
  },
  instructionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  progressText: {
    color: "#3b82f6",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  faceFrame: {
    width: 250,
    height: 300,
    borderWidth: 3,
    borderColor: "#3b82f6",
    borderRadius: 150,
    backgroundColor: "transparent",
  },
  progressIndicators: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    gap: 12,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressDotActive: {
    backgroundColor: "#3b82f6",
  },
  controls: {
    backgroundColor: "#000",
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonSecondary: {
    backgroundColor: "#6b7280",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  helpText: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#374151",
  },
});
