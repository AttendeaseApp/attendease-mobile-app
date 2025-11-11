import { authFetch } from "@/services/auth-fetch";
import { Event } from "@/interface/event-sessions/Event";
import {
  RETRIEVE_ONGOING_EVENTS,
  RETRIEVE_USER_PROFILE,
} from "../constants/api";

/**
 *  Fetches home page data including ongoing events and user profile.
 *  It updates the provided state setters with the fetched data and loading state.
 *
 *  @param setEvents - State setter for the list of events.
 *  @param setUser - State setter for the user profile information.
 *  @param setLoading - State setter for the loading state.
 */

export async function fetchHomePageData(
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
  setUser: React.Dispatch<
    React.SetStateAction<{ firstName: string; lastName: string } | null>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const [eventsResponse, profileResponse] = await Promise.all([
      authFetch(RETRIEVE_ONGOING_EVENTS),
      authFetch(RETRIEVE_USER_PROFILE),
    ]);

    if (!eventsResponse.ok) throw new Error("Failed to fetch events");
    if (!profileResponse.ok) throw new Error("Failed to fetch profile");

    const eventsData = await eventsResponse.json();
    const profileData = await profileResponse.json();

    setEvents(eventsData || []);
    setUser(profileData.user || null);
  } catch (error) {
    console.error("Error fetching home page data:", error);
    setEvents([]);
    setUser(null);
  } finally {
    setLoading(false);
  }
}
