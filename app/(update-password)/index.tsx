import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Button } from '../../components/Button'
import { ScreenContainer } from '../../components/layouts/CustomScreenContainer'
import NavBar from '../../components/NavBar'
import { ThemedText } from '../../components/ThemedText'
import { updatePassword } from '../../services/profile/fetch-profile-page-data'
import { ThemedTextInput } from '../../components/ThemedTextInput'
import { styles as profileStyles } from '../../styles/UserProfile.styles'

const formStyles = {
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
}

interface PasswordFormState {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

export default function ChangePassword() {
    const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handlePasswordChange = (
        field: keyof PasswordFormState,
        value: string,
    ) => {
        setPasswordForm((prev) => ({ ...prev, [field]: value }))
        if (error) setError(null)
    }

    const validatePasswordForm = (): string | null => {
        if (!passwordForm.oldPassword.trim()) return 'Old password is required.'
        if (!passwordForm.newPassword.trim()) return 'New password is required.'
        if (passwordForm.newPassword.length < 8)
            return 'New password must be at least 8 characters long.'
        if (passwordForm.newPassword !== passwordForm.confirmNewPassword)
            return "New passwords don't match."
        return null
    }

    const performPasswordUpdate = async () => {
        setLoading(true)
        setError(null)
        try {
            const message = await updatePassword(
                passwordForm.oldPassword,
                passwordForm.newPassword,
            )
            Alert.alert('Success', message, [
                { text: 'Done', onPress: () => router.back() },
            ])
            setPasswordForm({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            })
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Failed to update password'
            setError(errorMessage)
            Alert.alert('Error', errorMessage, [{ text: 'OK' }])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = () => {
        const validationError = validatePasswordForm()
        if (validationError) {
            setError(validationError)
            return
        }

        Alert.alert(
            'Confirm Password Change',
            'This will update your password. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: performPasswordUpdate,
                },
            ],
            { cancelable: true },
        )
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <ScreenContainer>
            <NavBar title="Change Password" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={profileStyles.centerWrapper}
            >
                <View>
                    <ThemedText type="default" style={{ marginBottom: 20 }}>
                        Enter your old password and a new one to update it. New
                        passwords must be at least 8 characters.
                    </ThemedText>
                    <View style={formStyles.inputContainer}>
                        <ThemedText type="default" style={formStyles.label}>
                            Old Password *
                        </ThemedText>
                        <ThemedTextInput
                            isPassword
                            value={passwordForm.oldPassword}
                            onChangeText={(value) =>
                                handlePasswordChange('oldPassword', value)
                            }
                            placeholder="Enter old password"
                            editable={!loading}
                            variant="outlined"
                        />
                    </View>
                    <View style={formStyles.inputContainer}>
                        <ThemedText type="default" style={formStyles.label}>
                            New Password *
                        </ThemedText>
                        <ThemedTextInput
                            isPassword
                            value={passwordForm.newPassword}
                            onChangeText={(value) =>
                                handlePasswordChange('newPassword', value)
                            }
                            placeholder="Enter new password (min 8 chars)"
                            editable={!loading}
                            variant="outlined"
                        />
                    </View>
                    <View
                        style={[
                            formStyles.inputContainer,
                            { marginBottom: 20 },
                        ]}
                    >
                        <ThemedText type="default" style={formStyles.label}>
                            Confirm New Password *
                        </ThemedText>
                        <ThemedTextInput
                            isPassword
                            value={passwordForm.confirmNewPassword}
                            onChangeText={(value) =>
                                handlePasswordChange(
                                    'confirmNewPassword',
                                    value,
                                )
                            }
                            placeholder="Confirm new password"
                            editable={!loading}
                            variant="outlined"
                        />
                    </View>
                    {error && (
                        <ThemedText
                            type="default"
                            style={{
                                color: 'red',
                                fontSize: 14,
                                marginBottom: 20,
                            }}
                        >
                            {error}
                        </ThemedText>
                    )}
                    <Button
                        title={loading ? 'Updating...' : 'Update Password'}
                        onPress={handleSubmit}
                        disabled={loading}
                    />
                    <Button
                        title="Cancel"
                        onPress={handleCancel}
                        disabled={loading}
                        style={{ marginTop: 10 }}
                    />
                </View>
            </KeyboardAvoidingView>
        </ScreenContainer>
    )
}
