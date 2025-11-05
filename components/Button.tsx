import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ThemedText type="default" colorVariant="black">
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffffff",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 0,
    alignItems: "center",
    width: "100%",
  },
  disabled: {
    backgroundColor: "#999",
  },
});
