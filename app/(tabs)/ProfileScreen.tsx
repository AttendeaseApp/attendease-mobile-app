import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { logout } from "@/services/auth";
import { authFetch } from "@/services/authFetch";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";
import { RETRIVE_USER_PROFILE } from "../../constants/api";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await authFetch(RETRIVE_USER_PROFILE);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/LoginScreen");
  };

  if (loading) {
    return (
      <ScreenContainer>
        <NavBar />
        <View style={styles.centerWrapper}>
          <ActivityIndicator size="large" />
        </View>
      </ScreenContainer>
    );
  }

  if (!profile) {
    return (
      <ScreenContainer>
        <NavBar />
        <View style={styles.centerWrapper}>
          <ThemedText type="title">Failed to load profile.</ThemedText>
        </View>
      </ScreenContainer>
    );
  }

  const { user, student } = profile;

  return (
    <ScreenContainer>
      <NavBar title="PROFILE" />
      <View style={styles.centerWrapper}>
        <View style={{ marginBottom: 20 }}>
          <ThemedText type="titleSecondary" fontFamilyOverride="Newsreader">
            {user.firstName} {user.lastName}
          </ThemedText>
          <ThemedText type="default">{user.userType}</ThemedText>
          <ThemedText type="default">
            Student No: {student?.studentNumber || "N/A"}
          </ThemedText>
        </View>
        <Button title="LOG OUT" onPress={handleLogout} />
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
