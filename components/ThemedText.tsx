import { StyleSheet, Text, TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "titleSecondary"
    | "subTitleSecondary";
  colorVariant?: "black" | "white";
  fontFamilyOverride?: string; // NEW optional prop
};

export function ThemedText({
  style,
  type = "default",
  colorVariant = "black",
  fontFamilyOverride, // destructure new prop
  ...rest
}: ThemedTextProps) {
  const textColor = colorVariant === "white" ? "#fff" : "#000";
  const defaultFontFamily =
    type === "titleSecondary" && "subTitleSecondary"
      ? "Newsreader"
      : "AfacadFlux";

  return (
    <Text
      style={[
        {
          color: textColor,
          fontFamily: fontFamilyOverride ?? defaultFontFamily,
        },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "titleSecondary" ? styles.titleSecondary : undefined,
        type === "subTitleSecondary" ? styles.subTitleSecondary : undefined,
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
    fontSize: 18,
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
  titleSecondary: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "400",
  },
  subTitleSecondary: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "400",
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
