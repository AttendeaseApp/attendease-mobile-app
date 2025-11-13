import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useEventCheckIn } from '@/hooks/event-registration/use-event-registration'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native'
import styles from '@/styles/biometrics/verification.styles'

export default function FaceVerificationScreen() {
    const cameraRef = useRef<CameraView>(null)
    const [permission, requestPermission] = useCameraPermissions()
    const [loading, setLoading] = useState(false)
    const { eventId, locationId } = useLocalSearchParams<{
        eventId: string
        locationId: string
    }>()
    const { checkIn } = useEventCheckIn(eventId, locationId)
    const router = useRouter()

    const captureAndVerify = async () => {
        if (!cameraRef.current) {
            Alert.alert('Camera not ready')
            return
        }

        setLoading(true)
        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: true,
            })
            checkIn(photo.base64!)
            router.back()
        } catch (error: any) {
            Alert.alert(
                'Capture Error',
                error.message || 'Failed to capture image. Try again.',
            )
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (permission === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>
                    Requesting camera permission...
                </Text>
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>
                    We need your permission to access the camera for face
                    verification.
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="front" />
            <View style={styles.overlay}>
                <Text style={styles.instructionText}>
                    Position your face in the frame and tap Verify me to
                    register.
                </Text>
                <View style={styles.buttonContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Button title="Verify me" onPress={captureAndVerify} />
                    )}
                </View>
            </View>
        </View>
    )
}
