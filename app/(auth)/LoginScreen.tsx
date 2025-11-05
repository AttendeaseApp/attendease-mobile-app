import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
<<<<<<< HEAD
import { styles } from "../../styles/LoginScreen.styles";
=======
import styles from "../../styles/LoginScreen.styles";
>>>>>>> d417bb5cc657deb5c96e4d0e6589c00dba309182

/**
 * Login Screen Component
 *
 * @returns JSX.Element
 */
const LoginScreen = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await login(studentNumber, password);

      if (result.success) {
        router.replace("/(tabs)/Homepage");
      } else {
        Alert.alert("Login failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText
            type="titleSecondary"
            fontFamilyOverride="StackSansHeadline"
          >
            RCians Attendease
          </ThemedText>
          <ThemedText type="default">
            Discover events, check-in seamlessly, and stay connected with your
            community.
          </ThemedText>
        </View>

        <View>
          <ThemedText type="default">
            Log into your attendease account.
          </ThemedText>
        </View>

        <ThemedTextInput
          placeholder="Student Number"
          value={studentNumber}
          onChangeText={setStudentNumber}
          autoCapitalize="characters"
          variant="outlined"
          fontFamilyOverride="AfacadFlux"
          backgroundColorOverride="transparent"
        />

        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          variant="outlined"
          fontFamilyOverride="AfacadFlux"
          backgroundColorOverride="transparent"
        />

        <Button title="LOG IN" onPress={handleLogin} loading={loading} />
      </View>

      <ThemedText type="default" style={{ fontSize: 13 }}>
        2025 Rogationist Computer Society - RCians Attendease
      </ThemedText>
    </View>
  );
};

export default LoginScreen;
