import { authFetch } from '@/services/auth-fetch'
import { RETRIEVE_USER_PROFILE } from '../../constants/api'

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
