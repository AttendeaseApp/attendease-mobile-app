import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText'
import { AttendanceHistory } from '@/interface/attendance/history/attendance-history-interface'

const AttendanceHistoryCard: React.FC<AttendanceHistory> = ({
    eventName,
    timeIn,
    timeOut,
    attendanceStatus,
    reason,
}) => {
    return (
        <View style={styles.card}>
            <View>
                <ThemedText type="title" fontFamilyOverride="AfacadFlux">
                    {eventName}
                </ThemedText>
                <ThemedText type="default">{timeIn}</ThemedText>
                <ThemedText type="default">{timeOut}</ThemedText>
                <ThemedText type="default">{attendanceStatus}</ThemedText>
                <ThemedText type="default">Reason: {reason}</ThemedText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingBottom: 20,
        width: '100%',
        gap: 10,
        marginBlock: 20,
    },
})

export default AttendanceHistoryCard
