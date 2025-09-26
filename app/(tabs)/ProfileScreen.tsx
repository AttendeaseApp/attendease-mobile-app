import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";

export default function Profile() {
  return (
    <ScreenContainer>
      <NavBar />
      <View style={styles.centerWrapper}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
          />

          <ThemedText type="title">John Doe</ThemedText>
          <ThemedText type="default">STUDENT</ThemedText>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            {/* you can add your profile details here */}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerWrapper: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  header: {
    backgroundColor: "#27548A",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  myProfileText: {
    fontSize: 20,
    color: "#ffffffff",
    marginBottom: 50,
  },
});
