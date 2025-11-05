import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface NavBarProps {
  title?: string;
}

const NavBar: React.FC<NavBarProps> = ({ title = "ATTENDEASE" }) => (
  <View style={styles.headerBackground}>
    <ThemedText type="title">{title}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  headerBackground: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavBar;
