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
    <View style={styles.headerContainer}>
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
        <MaterialIcons name="notifications" size={28} color="#060606ff" />
      </TouchableOpacity>
    </View>
    <Text style={styles.TODAYLabel}>TODAY</Text>
  </View>
);

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: "#27548A",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 200,
    paddingTop: 40,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileIconButton: {
    backgroundColor: "#27548A",
    borderRadius: 20,
    padding: 4,
  },
  NOTIFButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
  },
  NameOfStudent: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  UserSection: {
    color: "#fff",
    fontSize: 14,
  },
  TODAYLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 16,
  },
});

export default NavBar;
