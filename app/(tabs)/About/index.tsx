import { ThemedText } from "../../../components/ThemedText";
import React from "react";
import { View } from "react-native";
import { ScreenContainer } from "../../../components/layouts/CustomScreenContainer";
import NavBar from "../../../components/NavBar";

/**
 * About Screen component that displays information about the application.
 *
 * @returns JSX.Element representing the About Screen.
 */
export default function About() {
    return (
        <ScreenContainer>
            <View>
                <NavBar title="ABOUT" />

                <View>
                    <ThemedText type="default" fontFamilyOverride="StackSansHeadline">
                        RCians Attendease
                    </ThemedText>

                    <ThemedText type="default">Version 1.0.0</ThemedText>

                    <ThemedText type="default" style={{ marginTop: 10, fontSize: 18 }}>
                        RCians Attendease is your go-to app for discovering events, seamless check-ins, and staying connected with your community. Whether you&apos;re attending academic or
                        non-academic events, RCians Attendease makes it easy to manage your event experiences all in one place.
                    </ThemedText>

                    <ThemedText type="default" style={{ marginTop: 10, fontSize: 13 }}>
                        2025 Rogationist College - College Department
                    </ThemedText>
                </View>
            </View>
        </ScreenContainer>
    );
}
