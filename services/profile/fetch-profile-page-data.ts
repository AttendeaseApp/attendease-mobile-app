import { authFetch } from '@/services/auth-fetch'
import { RETRIEVE_USER_PROFILE, UPDATE_PASSWORD } from '../../constants/api'

/**
 * Fetches profile page data.
 * It updates the provided state setters with the fetched data and loading state.
 *
 * @param setProfile
 * @param setLoading
 */
export async function fetchProfilePageData(
    setProfile: React.Dispatch<React.SetStateAction<Event[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
    try {
        const response = await authFetch(RETRIEVE_USER_PROFILE)
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        setProfile(data)
    } catch (error) {
        console.error('Error fetching profile:', error)
    } finally {
        setLoading(false)
    }
}

interface PasswordUpdateRequest {
    oldPassword: string
    newPassword: string
}

/**
 * Updates the user's password.
 *
 * @param oldPassword - Current password
 * @param newPassword - New password
 * @returns Promise resolving to the success message or throws an error
 */
export async function updatePassword(
    oldPassword: string,
    newPassword: string,
): Promise<string> {
    const requestBody: PasswordUpdateRequest = { oldPassword, newPassword }
    const response = await authFetch(UPDATE_PASSWORD, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to update password')
    }
    return response.text()
}
