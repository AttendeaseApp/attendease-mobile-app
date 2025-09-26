import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";

export default function Notifications() {
  return (
    <ScreenContainer>
      <View>
        <NavBar title="NOTIFICATIONS" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    flex: 1,
    width: "100%",
  },
});
