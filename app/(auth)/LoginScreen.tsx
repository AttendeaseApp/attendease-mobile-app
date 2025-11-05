import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import styles from "./LoginScreen.styles";

const LoginScreen = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await login(studentNumber, password);

    if (result.success) {
      router.replace("/(tabs)/Homepage");
    } else {
      Alert.alert("Login failed", result.message || "Invalid credentials");
    }
  };

  return (
    // <ImageBackground
    //   source={require("../../assets/images/login-background.png")}
    //   resizeMode="cover"
    // >
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="titleSecondary">ATTENDEASE</ThemedText>
          <ThemedText type="default">LOG IN</ThemedText>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Student Number"
          value={studentNumber}
          onChangeText={setStudentNumber}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="LOG IN" onPress={handleLogin} />
      </View>
    </View>
    // </ImageBackground>
  );
};

export default LoginScreen;
