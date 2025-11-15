import { registerFaceEncoding } from '../../../services/api/auth/biometrics/register-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/biometrics/registration.styles'
import { ThemedText } from '../../../components/ThemedText'
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

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
        if (currentStep === 0) return 'Face forward - Look directly at camera'
        if (currentStep === 1) return 'Turn slightly left'
        if (currentStep === 2) return 'Again, turn slightly left'
        if (currentStep === 3) return 'Turn slightly right'
        if (currentStep === 4) return 'Again, turn slightly right'
        return 'Capture complete'
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
            } else {
                Alert.alert(
                    'Image Captured',
                    `${newImages.length}/${REQUIRED_IMAGES} images captured. ${getInstructionText()}`,
                    [{ text: 'OK' }],
                )
            }
        } catch (error: any) {
            console.error('Face capture error:', error)
            Alert.alert('Error', error.message || 'Failed to capture image')
        } finally {
            setIsProcessing(false)
        }
    }

    const sendImagesToServer = async (images: string[]) => {
        setIsProcessing(true)
        try {
            const result = await registerFaceEncoding(images)

            if (result.success) {
                Alert.alert(
                    'Success',
                    result.message ?? 'Face registered successfully!',
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
                    'Something went wrong during face registration.',
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
                <Text>Requesting camera permission...</Text>
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <ThemedText type="default">
                    Camera access is required to register your face
                </ThemedText>
                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="front" ref={cameraRef}>
                <View style={styles.overlay}>
                    <View style={styles.instructionBox}>
                        <ThemedText type="default">
                            {getInstructionText()}
                        </ThemedText>
                        <ThemedText type="defaultSemiBold">
                            {capturedImages.length}/{REQUIRED_IMAGES} images
                            captured
                        </ThemedText>
                    </View>

                    {/* Face frame guide */}
                    <View style={styles.faceFrame} />

                    {/* Progress indicators */}
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
                {capturedImages.length > 0 &&
                    capturedImages.length < REQUIRED_IMAGES && (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSecondary]}
                            onPress={resetCapture}
                            disabled={isProcessing}
                        >
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                    )}

                <TouchableOpacity
                    style={[
                        styles.button,
                        (isProcessing ||
                            capturedImages.length >= REQUIRED_IMAGES) &&
                            styles.buttonDisabled,
                    ]}
                    onPress={captureImage}
                    disabled={
                        isProcessing || capturedImages.length >= REQUIRED_IMAGES
                    }
                >
                    {isProcessing ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {capturedImages.length === 0
                                ? 'Start Registration'
                                : `Capture Image ${capturedImages.length + 1}`}
                        </Text>
                    )}
                </TouchableOpacity>

                <ThemedText type="default">
                    {capturedImages.length === 0
                        ? "You'll need to capture 5 images from different angles"
                        : capturedImages.length < REQUIRED_IMAGES
                          ? 'Follow the instructions for each capture'
                          : 'Processing your images...'}
                </ThemedText>
            </View>
        </View>
    )
}
