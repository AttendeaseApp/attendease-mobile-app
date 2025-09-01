import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Blue curved top header full width */}
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Attendease</Text>
      </View>

      {/* 🔹 Login card */}
      <View style={styles.loginCard}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // Blue top part
  headerBackground: {
    backgroundColor: "#27548A",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 220,
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",

  },

  // Login card
  loginCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -40, // float slightly over the header
    borderRadius: 16,
    padding: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#27548A",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#7544FC",
    borderRadius: 23,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
