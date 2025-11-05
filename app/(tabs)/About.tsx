import React from "react";
import { View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";

/**
 * About Screen component that displays information about the application.
 *
 * @returns JSX.Element representing the About Screen.
 */
export default function About() {
  return (
    <ScreenContainer>
      <View>
        <NavBar title="About" />
      </View>
    </ScreenContainer>
  );
}
