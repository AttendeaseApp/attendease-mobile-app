import { authFetch } from "@/services/auth-fetch";
import { RETRIVE_USER_PROFILE } from "../constants/api";

export async function fetchProfilePageData(
  setProfile: React.Dispatch<React.SetStateAction<Event[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await authFetch(RETRIVE_USER_PROFILE);
    if (!response.ok) throw new Error("Failed to fetch events");
    const data = await response.json();
    setProfile(data);
  } catch (error) {
    console.error("Error fetching profile:", error);
  } finally {
    setLoading(false);
  }
}
