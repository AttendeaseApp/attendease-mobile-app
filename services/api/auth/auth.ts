import { LOGIN_ENDPOINT } from '@/constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Logs in a user with the provided student number and password.
 * On success, stores the auth token in AsyncStorage.
 *
 * @param studentNumber User's student number
 * @param password User's password
 * @returns An object indicating success or failure, along with relevant data.
 */
export async function login(
    studentNumber: string,
    password: string,
): Promise<{
    success: boolean
    message?: string
    requiresFacialRegistration?: boolean
    studentNumber?: string
    token?: string
}> {
    try {
        const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentNumber, password }),
        })

        const data = await response.json()

        if (response.ok && data.token) {
            await AsyncStorage.setItem('authToken', data.token)
            return {
                success: true,
                requiresFacialRegistration: data.requiresFacialRegistration,
                studentNumber: data.studentNumber,
                token: data.token,
            }
        } else {
            return {
                success: false,
                message: data.message || 'Invalid credentials',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Network error. Please try again.' + error,
        }
    }
}

/**
 * Logs out the current user by removing the auth token from AsyncStorage.
 */
export async function logout() {
    // TODO: server-side logout handling
    await AsyncStorage.removeItem('authToken')
}
