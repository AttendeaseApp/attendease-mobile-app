import { authFetch } from "@/services/auth-fetch";
import { Event } from "@/types/event-sessions/Event";
import {
  RETRIEVE_ONGOING_EVENTS,
  RETRIVE_USER_PROFILE,
} from "../constants/api";

export async function fetchHomePageData(
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
  setUser: React.Dispatch<
    React.SetStateAction<{ firstName: string; lastName: string } | null>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const eventsResponse = await authFetch(RETRIEVE_ONGOING_EVENTS);
    if (!eventsResponse.ok) throw new Error("Failed to fetch events");
    const eventsData = await eventsResponse.json();
    setEvents(eventsData);

    const profileResponse = await authFetch(RETRIVE_USER_PROFILE);
    if (!profileResponse.ok) throw new Error("Failed to fetch profile");
    const profileData = await profileResponse.json();
    setUser(profileData.user);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
}
