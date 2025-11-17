import React, { useEffect, useState, useCallback } from 'react'
import { ActivityIndicator, View, FlatList, RefreshControl } from 'react-native'
import { ScreenContainer } from '../../../components/layouts/CustomScreenContainer'
import NavBar from '../../../components/NavBar'
import { ThemedText } from '../../../components/ThemedText'
import { styles } from '../../../styles/UserProfile.styles'
import AttendanceHistoryCard from '../../../components/attendance-history/AttendanceHistoryCard'

import { getAttendanceHistory } from '../../../services/attendance/history/get-attendance-history'

/**
 * This is the Attendance History Page where the student can view all their attendance histories from events.
 *
 * @returns JSX.Element representing the AttendanceHistoryPage.
 */
export default function AttendanceHistoryPage() {
    const [histories, setAttendanceHistories] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getAttendanceHistory(setAttendanceHistories, setLoading)
    }, [])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await getAttendanceHistory(setAttendanceHistories, setLoading)
        setRefreshing(false)
    }, [])

    if (loading) {
        return (
            <ScreenContainer>
                <NavBar />
                <View style={styles.centerWrapper}>
                    <ActivityIndicator size="large" />
                </View>
            </ScreenContainer>
        )
    }

    if (!histories) {
        return (
            <ScreenContainer>
                <NavBar />
                <View style={styles.centerWrapper}>
                    <ThemedText type="title">
                        There is a problem in loading your Attendance Histories.
                    </ThemedText>
                </View>
            </ScreenContainer>
        )
    }
    return (
        <ScreenContainer>
            <NavBar title="ATTENDANCE RECORDS" />
            <View style={styles.centerWrapper}>
                {histories.length === 0 ? (
                    <ThemedText type="default" style={{ marginTop: 20 }}>
                        No attendance records found!
                    </ThemedText>
                ) : (
                    <FlatList
                        data={histories}
                        keyExtractor={(item, index) =>
                            item.eventId || `event-${index}`
                        }
                        renderItem={({ item }) => (
                            <AttendanceHistoryCard
                                eventId={item.eventId}
                                eventName={item.eventName}
                                timeIn={item.timeIn}
                                timeOut={item.timeOut}
                                attendanceStatus={item.attendanceStatus}
                                reason={item.reason}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#27548A']}
                                tintColor="#27548A"
                            />
                        }
                    />
                )}
            </View>
        </ScreenContainer>
    )
}
