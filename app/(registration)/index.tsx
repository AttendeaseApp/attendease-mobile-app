import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, View, ScrollView, RefreshControl } from "react-native";
import { Button } from "../../components/Button";
import { ThemedText } from "../../components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "../../components/layouts/CustomScreenContainer";
import NavBar from "../../components/NavBar";
import { styles } from "../../styles/EventRegistrationPage.styles";
import { useEventCheckIn } from "../../hooks/event-registration/use-event-registration";
import { checkLocation } from "../../services/verify-event-registration";

export default function EventCheckInPage() {
    const { eventId, locationId, eventStatus, eventName } = useLocalSearchParams<{
        eventId: string;
        locationId: string;
        eventStatus: string;
        eventName: string;
    }>();

    const parsedEventId = Array.isArray(eventId) ? eventId[0] : eventId;
    const parsedLocationId = Array.isArray(locationId) ? locationId[0] : locationId;
    const parsedEventStatus = Array.isArray(eventStatus) ? eventStatus[0] : eventStatus;
    const parsedEventName = Array.isArray(eventName) ? eventName[0] : eventName;

    const { latitude, longitude, loading, locationLoading, isPinging, lastPingTime, checkIn } = useEventCheckIn(parsedEventId!, parsedLocationId!);

    const [locationStatus, setLocationStatus] = useState<{ isInside: boolean; message: string } | null>(null);
    const [checkingLocation, setCheckingLocation] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchLocationStatus = useCallback(async () => {
        if (latitude && longitude && parsedLocationId) {
            setCheckingLocation(true);
            const res = await checkLocation(parsedLocationId, latitude, longitude);
            if (res.success) {
                setLocationStatus(res.data);
            } else {
                setLocationStatus({ isInside: false, message: res.message });
            }
            setCheckingLocation(false);
        }
    }, [latitude, longitude, parsedLocationId]);

    useEffect(() => {
        fetchLocationStatus();
    }, [fetchLocationStatus]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchLocationStatus();
        setRefreshing(false);
    }, [fetchLocationStatus]);

    return (
        <ScreenContainer>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <NavBar title="EVENT DETAILS" />

                {[
                    { label: "Event Name", value: parsedEventName },
                    { label: "Status", value: parsedEventStatus },
                ].map(({ label, value }) => (
                    <View key={label} style={styles.infoSection}>
                        <ThemedText type="default">{label.toUpperCase()}</ThemedText>
                        <ThemedText type="defaultSemiBold">{value || "N/A"}</ThemedText>
                    </View>
                ))}

                {locationLoading ? (
                    <View style={styles.locationLoadingContainer}>
                        <ActivityIndicator size="small" color="#000000ff" />
                        <ThemedText type="default" style={styles.locationLoadingText}>
                            Fetching your location...
                        </ThemedText>
                    </View>
                ) : (
                    <View style={styles.infoSection}>
                        <ThemedText type="default">MY CURRENT LOCATION</ThemedText>
                        {checkingLocation ? (
                            <ActivityIndicator size="small" color="#4CAF50" />
                        ) : locationStatus ? (
                            <ThemedText type="default" style={{ color: locationStatus.isInside ? "green" : "red" }}>
                                {locationStatus.message}
                            </ThemedText>
                        ) : null}
                    </View>
                )}

                {isPinging ? (
                    <View style={styles.pingStatusContainer}>
                        <ActivityIndicator size="small" color="#4CAF50" />
                        <ThemedText type="default" style={styles.pingStatusText}>
                            Attendance Tracking ACTIVE (pinging every 1 min)
                        </ThemedText>
                        <ThemedText type="default" style={styles.lastPingText}>
                            Last successful ping: {lastPingTime || "just now"}
                        </ThemedText>
                    </View>
                ) : (
                    <View style={styles.infoSection}>
                        <ThemedText type="default">Attendance Tracking Status</ThemedText>
                        <ThemedText type="default">INACTIVE. Press REGISTER to begin.</ThemedText>
                    </View>
                )}

                <View style={styles.buttonWrapper}>
                    <Button title={loading ? "REGISTERING..." : "REGISTER"} onPress={checkIn} disabled={loading || locationLoading || !latitude || !longitude} />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}
