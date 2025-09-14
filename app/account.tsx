import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* back button */}
        <TouchableOpacity style={styles.backButton}>
          <View style={styles.backCircle}>
            <Ionicons name="chevron-back" size={24} color="#6E62FF" />
          </View>
        </TouchableOpacity>

        <Text style={styles.myProfileText}>My Profile</Text>
      </View>

      {/* avatar wrapped in container */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          {/* you can add your profile details here */}
        </View>
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
    backgroundColor: "#27548A",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
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
  avatarContainer: {
    alignItems: "center",
    marginTop: -65,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  myProfileText: {
    fontSize: 20,
    color: "#ffffffff",
    marginBottom: 50,
  },
});
