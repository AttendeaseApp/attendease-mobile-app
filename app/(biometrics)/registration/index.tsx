import { registerFaceEncoding } from '../../../services/biometrics/register-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/biometrics/registration.styles'
import { ThemedText } from '../../../components/ThemedText'
import { Alert, View } from 'react-native'
import { Button } from '../../../components/Button'

const REQUIRED_IMAGES = 5

export default function FacialRegistration() {
    const router = useRouter()
    const cameraRef = useRef<CameraView | null>(null)
    const [permission, requestPermission] = useCameraPermissions()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [capturedImages, setCapturedImages] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState<number>(0)

    useEffect(() => {
        ;(async () => {
            const storedToken = await AsyncStorage.getItem('authToken')
            setIsLoggedIn(!!storedToken)
        })()
    }, [])

    const getInstructionText = () => {
        if (currentStep === 0)
            return 'Step 1: Face forward - Look directly at the camera'
        if (currentStep === 1) return 'Step 2: Turn slightly left'
        if (currentStep === 2) return 'Step 3: Turn fully left'
        if (currentStep === 3) return 'Step 4: Turn slightly right'
        if (currentStep === 4) return 'Step 5: Turn fully right'
        return 'REGISTRATION COMPLETE'
    }

    const captureImage = async () => {
        if (!cameraRef.current || isProcessing) return

        if (!isLoggedIn) {
            Alert.alert(
                'Authentication required',
                'Please login to register your face.',
            )
            return
        }

        setIsProcessing(true)

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
            })

            if (!photo) {
                Alert.alert('Error', 'Failed to capture image')
                setIsProcessing(false)
                return
            }

            const newImages = [...capturedImages, photo.uri]
            setCapturedImages(newImages)
            setCurrentStep(currentStep + 1)

            if (newImages.length >= REQUIRED_IMAGES) {
                await sendImagesToServer(newImages)
            }
        } catch (error: any) {
            console.error('Face capture error:', error)
            Alert.alert('Error', error.message || 'Failed to capture image')
        } finally {
            if (capturedImages.length < REQUIRED_IMAGES - 1) {
                setIsProcessing(false)
            }
        }
    }

    const sendImagesToServer = async (images: string[]) => {
        setIsProcessing(true)
        try {
            const result = await registerFaceEncoding(images)

            if (result.success) {
                Alert.alert(
                    'Success',
                    result.message ??
                        'Face registered successfully! You can now use facial verification.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                router.replace('/(tabs)/Homepage')
                                setCapturedImages([])
                                setCurrentStep(0)
                            },
                        },
                    ],
                )
            } else {
                Alert.alert(
                    'Registration Failed',
                    result.message ??
                        'Face registration failed. Please try again.',
                    [
                        {
                            text: 'Retry',
                            onPress: () => {
                                setCapturedImages([])
                                setCurrentStep(0)
                            },
                        },
                    ],
                )
            }
        } catch (error: any) {
            console.error('Face registration error:', error)
            Alert.alert(
                'Error',
                error.message ||
                    'Something went wrong during face registration. Please check your network connection.',
                [
                    {
                        text: 'Retry',
                        onPress: () => {
                            setCapturedImages([])
                            setCurrentStep(0)
                        },
                    },
                ],
            )
        } finally {
            setIsProcessing(false)
        }
    }

    const resetCapture = () => {
        setCapturedImages([])
        setCurrentStep(0)
    }

    if (!permission) {
        return (
            <View style={styles.center}>
                <ThemedText type="default" style={styles.permissionText}>
                    Requesting camera permission...
                </ThemedText>
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <ThemedText type="default" style={styles.permissionText}>
                    Camera access is required to perform facial registration.
                    Please grant permission.
                </ThemedText>
                <Button
                    title="Grant Camera Permission"
                    onPress={requestPermission}
                    style={{ marginTop: 20 }}
                />
            </View>
        )
    }

    const isCaptureComplete = capturedImages.length >= REQUIRED_IMAGES
    const buttonText = isCaptureComplete
        ? 'Processing...'
        : capturedImages.length === 0
          ? 'Start Registration'
          : `Capture Image ${capturedImages.length + 1}`

    const helperText = isCaptureComplete
        ? 'Finalizing your biometric profile on the server...'
        : capturedImages.length === 0
          ? `You will capture ${REQUIRED_IMAGES} images from different angles to build your profile.`
          : 'Align your face to match the instructions above before tapping capture.'

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="front" ref={cameraRef}>
                <View style={styles.overlay}>
                    <View style={styles.instructionBox}>
                        <ThemedText type="default" colorVariant="white">
                            {getInstructionText()}
                        </ThemedText>
                        <ThemedText
                            type="default"
                            style={styles.progressCounter}
                        >
                            {capturedImages.length}/{REQUIRED_IMAGES} images
                            captured
                        </ThemedText>
                    </View>

                    <View style={styles.faceFrame} />

                    <View style={styles.progressIndicators}>
                        {[...Array(REQUIRED_IMAGES)].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.progressDot,
                                    index < capturedImages.length &&
                                        styles.progressDotActive,
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </CameraView>

            <View style={styles.controls}>
                <View style={styles.buttonGroup}>
                    {capturedImages.length > 0 &&
                        capturedImages.length < REQUIRED_IMAGES && (
                            <Button
                                title="Reset"
                                onPress={resetCapture}
                                disabled={isProcessing}
                                style={{ flex: 1 }}
                            />
                        )}
                    <Button
                        title={buttonText}
                        onPress={captureImage}
                        loading={isProcessing}
                        disabled={isProcessing || isCaptureComplete}
                        style={{
                            flex:
                                capturedImages.length > 0 &&
                                capturedImages.length < REQUIRED_IMAGES
                                    ? 2
                                    : 1,
                        }}
                    />
                </View>

                <ThemedText style={styles.helpText} type="default">
                    {helperText}
                </ThemedText>
            </View>
        </View>
    )
}
