import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
// styles
import { styles } from "@/styles/UserProfile.styles";
// ui
import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ScreenContainer } from "../../components/CustomScreenContainer";
import NavBar from "../../components/NavBar";
// services
import { logout } from "@/services/auth";
import { fetchProfilePageData } from "@/services/fetch-profile-page-data";

/**
 * This is the User Profile Page where users can view their profile information and log out of the application.
 *
 * @returns JSX.Element representing the User Profile Page.
 */
export default function UserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfilePageData(setProfile, setLoading);
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

        <View style={{ marginBottom: 20 }}>
          <ThemedText type="default">Change Password</ThemedText>
          <ThemedText type="default">(ToDo feature)</ThemedText>
        </View>
        <Button title="LOG OUT" onPress={handleLogout} />
      </View>
    </ScreenContainer>
  );
}
