import { authFetch } from '../auth-fetch'
import { CHECK_CURRENT_LOCATION } from '@/constants/api'

export async function validateCurrentLocation(
    locationId: string,
    latitude: number,
    longitude: number,
) {
    try {
        const response = await authFetch(CHECK_CURRENT_LOCATION, {
            method: 'POST',
            body: JSON.stringify({ locationId, latitude, longitude }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                message: errorData.message || 'Location check failed',
            }
        }

        const data = await response.json()
        return {
            success: true,
            data, // { isInside: boolean, message: string }
        }
    } catch (error: any) {
        console.error('checkLocation error:', error)
        return {
            success: false,
            message: error.message || 'Network error occurred',
        }
    }
}
