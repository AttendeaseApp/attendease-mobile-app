import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Header text */}
        <Text style={styles.headerText}>Notifications</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <View style={styles.backCircle}>
            <Ionicons name="chevron-back" size={24} color="#6E62FF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.emptyText}>No notifications yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginTop: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    top: 50,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});
