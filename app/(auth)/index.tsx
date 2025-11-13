import { Button } from '../../components/Button'
import { ThemedText } from '../../components/ThemedText'
import { ThemedTextInput } from '../../components/ThemedTextInput'
import { login } from '../../services/auth'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native'
import { styles } from '../../styles/LoginScreen.styles'

/**
 * Login Screen Component
 *
 * @returns JSX.Element
 */
const LoginScreen = () => {
    const [studentNumber, setStudentNumber] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if (!studentNumber || !password) {
            Alert.alert('Missing Information', 'Please enter your credentials.')
            return
        }
        setLoading(true)
        try {
            const result = await login(studentNumber, password)

            if (result.success) {
                if (result.requiresFacialRegistration) {
                    router.replace({
                        pathname: './(biometrics)/registration',
                        params: {
                            studentNumber: result.studentNumber,
                            token: result.token,
                        },
                    })
                } else {
                    router.replace('/(tabs)/Homepage')
                }
            } else {
                Alert.alert('Login failed', result.message || 'Invalid credentials')
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.')
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="titleSecondary" fontFamilyOverride="StackSansHeadline">
                        RCians Attendease
                    </ThemedText>
                    <ThemedText type="default">Discover events, check in seamlessly, and stay connected with your community.</ThemedText>
                </View>

                <View>
                    <ThemedText type="default">Log into your Attendease account.</ThemedText>
                </View>

                <ThemedTextInput
                    placeholder="Student Number"
                    value={studentNumber}
                    onChangeText={setStudentNumber}
                    autoCapitalize="characters"
                    variant="outlined"
                    fontFamilyOverride="AfacadFlux"
                    backgroundColorOverride="transparent"
                />

                <ThemedTextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    isPassword={true}
                    variant="outlined"
                    fontFamilyOverride="AfacadFlux"
                    backgroundColorOverride="transparent"
                />

                <Button title="LOG IN" onPress={handleLogin} loading={loading} />
            </View>

            <ThemedText type="default" style={{ fontSize: 13, textAlign: 'center' }}>
                2025 Rogationist College - College Department
            </ThemedText>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
