import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

        {/* back button */}
        <TouchableOpacity style={styles.backButton}>
          <View style={styles.backCircle}>
            <Ionicons name="chevron-back" size={24} color="#6E62FF" />
          </View>
        </TouchableOpacity>

        {/* My profile Text*/}
        <Text style={styles.myProfileText}>My Profile</Text>
      </View>

      {/* avatar/profile pic */}
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />
        <Text style={styles.profileName}>John Doe</Text>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT</Text>

          <View style={styles.sectionBody}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>wala pa</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>

          <View style={styles.sectionBody}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>Personal Data</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}> Office Assets</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>SMS Notifications</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Last Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>

          <View style={styles.sectionBody}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>wala pa</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>wala pa</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>wala pa</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.rowLabel}>Logout </Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

  //back button
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

  //profile pic
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

  profileName:{
   fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  body: {
    marginTop: 20,
  },
  myProfileText: {
    fontSize: 20,
    color: "#ffffffff",
    marginBottom: 50,
  },
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 16,
    height: 50,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },

  //button labels
  rowLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
