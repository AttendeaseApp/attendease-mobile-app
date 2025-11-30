import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Button } from '../../../components/Button'
import { ScreenContainer } from '../../../components/layouts/CustomScreenContainer'
import NavBar from '../../../components/NavBar'
import { ThemedText } from '../../../components/ThemedText'
import { logout } from '../../../services/auth'
import { fetchProfilePageData } from '../../../services/profile/fetch-profile-page-data'
import { styles } from '../../../styles/UserProfile.styles'

export default function UserProfile() {
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchProfilePageData(setProfile, setLoading)
    }, [])

    const handleLogout = async () => {
        await logout()
        router.replace('/(auth)')
    }

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

    if (!profile) {
        return (
            <ScreenContainer>
                <NavBar />
                <View style={styles.centerWrapper}>
                    <ThemedText type="title">
                        Failed to load profile.
                    </ThemedText>
                </View>
            </ScreenContainer>
        )
    }

    const { user, student } = profile

    return (
        <ScreenContainer>
            <NavBar title="PROFILE" />
            <View style={styles.centerWrapper}>
                <View style={{ marginBottom: 20 }}>
                    <ThemedText type="loginTitle">
                        {user.firstName} {user.lastName}
                    </ThemedText>
                    <ThemedText type="default">{user.userType}</ThemedText>
                    <ThemedText type="default">
                        Student No: {student?.studentNumber || 'N/A'}
                    </ThemedText>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Change Password"
                        onPress={() => router.push('../(update-password)')}
                    />
                </View>

                <Button title="Logout" onPress={handleLogout} />
            </View>
        </ScreenContainer>
    )
}
