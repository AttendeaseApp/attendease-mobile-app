import { StyleSheet, Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  colorVariant?: "black" | "white";
};

export function ThemedText({
  style,
  type = "default",
  colorVariant = "black",
  ...rest
}: ThemedTextProps) {
  const textColor = colorVariant === "white" ? "#fff" : "#000";
  return (
    <Text
      style={[
        { color: textColor, fontFamily: "AfacadFlux" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 30,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
