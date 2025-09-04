import { router } from "expo-router";
import React, { useState } from "react";
import {StyleSheet,Text,TextInput,TouchableOpacity,View,Keyboard,TouchableWithoutFeedback,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    router.replace("/(tabs)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        
        {/* 🔹 Blue curved top header full width */}
        <View style={styles.headerBackground}>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>A</Text>
            </View>
            <Text style={styles.logoText}>TTEANDEASE</Text>
          </View>
        </View>

        {/* 🔹 Login card */}
        <View style={styles.loginCard}>
          <Text style={styles.SignInText}>Sign In</Text>
          <Text style={styles.SignInToMyAccountText}>Sign in to my account</Text>

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

          {/* 🔹 Sign Up under button */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 10 }}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={{ color: "#0ea5e9", fontSize: 10 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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

  // Logo row with circle A
  logoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  logoLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27548A",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  // Login card
  loginCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 16,
    padding: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  SignInText: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 5, // closer to subtitle
    color: "#000",
    textAlign: "center",
  },

  SignInToMyAccountText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40, // gives space before inputs
    color: "#555",
  },

  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#7544FC",
    borderRadius: 23,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
