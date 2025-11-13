import { useColorScheme } from '@/hooks/useColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

export const unstable_settings = {
    initialRouteName: '(auth)/LoginScreen',
}

export const options = {
    headerShown: false,
}

export default function ProtectedLayout() {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const router = useRouter()
    const colorScheme = useColorScheme()

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        AfacadFlux: require('../assets/fonts/AfacadFlux-Light.ttf'),
        Newsreader: require('../assets/fonts/Newsreader_24pt-Medium.ttf'),
        StackSansHeadline: require('../assets/fonts/StackSansHeadline-VariableFont_wght.ttf'),
    })

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken')
                if (token) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch (err) {
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }
        checkAuth()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.replace('/(auth)')
            }
        }
    }, [isAuthenticated, isLoading])

    if (!loaded || isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }

    return (
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Slot />
            <StatusBar style="auto" />
        </ThemeProvider>
    )
}
