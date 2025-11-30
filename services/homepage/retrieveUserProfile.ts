import { authFetch } from '@/services/auth-fetch'
import { RETRIEVE_USER_PROFILE } from '../../constants/api'

/**
 *  Fetches home page data including ongoing events and user profile.
 *  It updates the provided state setters with the fetched data and loading state.
 *
 *  @param setEvents - State setter for the list of events.
 *  @param setUser - State setter for the user profile information.
 *  @param setLoading - State setter for the loading state.
 */

export async function retrieveUserProfileForHomepage(
    setUser: React.Dispatch<
        React.SetStateAction<{ firstName: string; lastName: string } | null>
    >,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
    setLoading(true)
    try {
        const [profileResponse] = await Promise.all([
            authFetch(RETRIEVE_USER_PROFILE),
        ])

        if (!profileResponse.ok) throw new Error('Failed to fetch profile')
        const profileData = await profileResponse.json()
        setUser(profileData.user || null)
    } catch (error) {
        console.error('Error fetching home page data:', error)
        setUser(null)
    } finally {
        setLoading(false)
    }
}
