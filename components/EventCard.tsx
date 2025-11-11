import { EventStatus } from "@/interface/event-sessions/Event";
import { EventCardProps } from "@/interface/event-sessions/EventCardProps";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { ThemedText } from "./ThemedText";
import { formatDateTime } from "@/utils/formatDateTime";

const getStatusStyle = (status: EventStatus) => {
    switch (status) {
        case EventStatus.ONGOING:
            return { color: "#1da750ff", icon: "sparkles-outline" }; // green
        case EventStatus.REGISTRATION:
            return { color: "#A16207", icon: "alert-outline" }; // yellow
        case EventStatus.UPCOMING:
            return { color: "#1D4ED8", icon: "pin-outline" }; // blue
        case EventStatus.CANCELLED:
            return { color: "#B91C1C", icon: "sad-outline" }; // red
        case EventStatus.CONCLUDED:
        case EventStatus.FINALIZED:
            return { color: "#374151", icon: "check-circle" }; // gray
        default:
            return { color: "#111827", icon: "help-outline" };
    }
};

const EventCard: React.FC<EventCardProps> = ({ eventId, eventName, eventStatus, timeInRegistrationStartDateTime, startDateTime, endDateTime, eventLocation }) => {
    const router = useRouter();

    const onAttend = () => {
        router.push({
            pathname: "../../(registration)",
            params: {
                eventId,
                locationId: eventLocation?.locationId,
            },
        });
    };

    const statusStyle = getStatusStyle(eventStatus);

    return (
        <View style={styles.card}>
            <View style={styles.statusRow}>
                <ThemedText type="default" style={[styles.statusText, { color: statusStyle.color }]}>
                    {eventStatus}
                </ThemedText>
            </View>

            <ThemedText type="title" fontFamilyOverride="AfacadFlux">
                {eventName}
            </ThemedText>

            <View>
                <ThemedText type="default">Registration: {formatDateTime(timeInRegistrationStartDateTime)}</ThemedText>
                <ThemedText type="default">Start: {formatDateTime(startDateTime)}</ThemedText>
                <ThemedText type="default">End: {formatDateTime(endDateTime)}</ThemedText>
            </View>

            {eventLocation ? <ThemedText type="default">Location: {eventLocation.locationName}</ThemedText> : null}

            <Button title="CHECK IN" onPress={onAttend} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        marginBottom: 16,
        width: "100%",
        gap: 10,
        marginBlock: 20,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    statusText: {
        fontSize: 15,
        textTransform: "capitalize",
    },
});

export default EventCard;
