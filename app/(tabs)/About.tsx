import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";

export default function About() {
  return (
    <ScreenContainer>
      <View>
        <NavBar title="About" />
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
