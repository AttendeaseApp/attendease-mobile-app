import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 15,
    backgroundColor: "#fff",
  },
});
