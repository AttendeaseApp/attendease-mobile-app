import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useEventRegistration } from '../../../lib/event-registration/_hooks/use-event-registration'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, View, ViewStyle } from 'react-native'
import styles from '../../../styles/biometrics/verification.styles'
import { ThemedText } from '../../../components/ThemedText'
import { Button } from '../../../components/Button'

export default function FaceVerificationScreen() {
    const cameraRef = useRef<CameraView>(null)
    const [permission, requestPermission] = useCameraPermissions()
    const [loading, setLoading] = useState(false)
    const { eventId, locationId } = useLocalSearchParams<{
        eventId: string
        locationId: string
    }>()
    const { latitude, longitude, locationLoading } = useEventRegistration(
        eventId,
        locationId,
    )
    const router = useRouter()

    const captureAndVerify = async () => {
        if (locationLoading || latitude === null || longitude === null) {
            Alert.alert(
                'Location Required',
                'We are still fetching your location coordinates. Please wait a moment and try again.',
            )
            return
        }

        if (!cameraRef.current) {
            Alert.alert(
                'Camera Error',
                'Camera is not ready. Please restart the app.',
            )
            return
        }

        setLoading(true)
        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: true,
            })

            if (!photo.base64) {
                throw new Error('Failed to capture image data.')
            }

            router.replace({
                pathname: '/(registration)',
                params: {
                    eventId,
                    locationId,
                    face: photo.base64,
                },
            })
        } catch (error: any) {
            Alert.alert(
                'Capture Error',
                error.message || 'An error occurred during image capture.',
            )
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (permission === null) {
        return (
            <View style={styles.center}>
                <ActivityIndicator
                    size="large"
                    color="#0D9488"
                    style={styles.loadingIndicator}
                />
                <ThemedText type="default" style={styles.loadingText}>
                    Requesting camera permission...
                </ThemedText>
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <ThemedText type="default" style={styles.permissionText}>
                    Camera access is required to verify your identity. This is
                    essential for secure event registration.
                </ThemedText>
                <Button
                    title="Grant Permission"
                    onPress={requestPermission}
                    style={styles.buttonStylePrimary as ViewStyle}
                />
            </View>
        )
    }

    const isProcessing = loading || locationLoading
    const loadingMessage = locationLoading
        ? 'Fetching secure location...'
        : 'Verifying face...'

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="front">
                <View style={styles.overlay}>
                    <View style={styles.instructionBox}>
                        <ThemedText type="defaultSemiBold" colorVariant="white">
                            Align your face inside the oval frame and tap the
                            button to verify your identity.
                        </ThemedText>
                    </View>

                    <View style={styles.faceFrame} />

                    <View style={styles.controls}>
                        {isProcessing ? (
                            <>
                                <ActivityIndicator
                                    size="large"
                                    color="#0D9488"
                                    style={styles.loadingIndicator}
                                />
                                <ThemedText
                                    type="default"
                                    colorVariant="white"
                                    style={styles.loadingText}
                                >
                                    {loadingMessage}
                                </ThemedText>
                            </>
                        ) : (
                            <Button
                                title="Verify My Identity"
                                onPress={captureAndVerify}
                                style={styles.buttonStylePrimary as ViewStyle}
                            />
                        )}
                    </View>
                </View>
            </CameraView>
        </View>
    )
}
