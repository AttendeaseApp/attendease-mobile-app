import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface NavBarProps {
  name: string;
  section: string;
  onProfilePress?: () => void;
  onNotifPress?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  name,
  section,
  onProfilePress,
  onNotifPress,
}) => (
  <View style={styles.headerBackground}>
    {/* Title always on top */}
    <Text style={styles.AppName}>ATTENDEASE</Text>

    {/* Row with profile + name/section + notif */}
    <View style={styles.rowContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.profileIconButton}
          onPress={onProfilePress}
        >
          <MaterialIcons name="person" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.NameOfStudent}>{name}</Text>
          <Text style={styles.UserSection}>{section}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.NOTIFButton} onPress={onNotifPress}>
        <MaterialIcons name="notifications" size={28} color="#27548A" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: "#ffffffff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 200,
    paddingTop: 40,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // ensures notif aligns with name/section vertically
  },
  profileIconButton: {
    backgroundColor: "#27548A",
    borderRadius: 20,
    padding: 4,
  },
  NOTIFButton: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    borderColor: "#000000ff",
    borderWidth: 2,
    padding: 4,
  },
  NameOfStudent: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 18,
  },
  UserSection: {
    color: "#000000ff",
    fontSize: 14,
  },
  AppName: {
    marginTop: 20,
    color: "#27548A",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default NavBar;
