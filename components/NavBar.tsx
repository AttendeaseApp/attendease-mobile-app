import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => (
  <View style={styles.headerBackground}>
    {/* app name on top */}
    <ThemedText type="title">ATTENDEASE</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  headerBackground: {
    paddingBlock: 10,
    overflow: "hidden",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default NavBar;
