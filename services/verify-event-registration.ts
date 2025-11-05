import { REGISTER_STUDENT_ON_EVENT_ENDPOINT } from "@/constants/api";
import { authFetch } from "./auth-fetch";

/**
 * Verifies a student's check-in for an event by sending their location and event details to the server.
 *
 * @param eventId
 * @param locationId
 * @param latitude
 * @param longitude
 * @returns
 */
export async function verifyCheckIn(
  eventId: string,
  locationId: string,
  latitude: number,
  longitude: number
) {
  try {
    const response = await authFetch(REGISTER_STUDENT_ON_EVENT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        eventId,
        locationId,
        latitude,
        longitude,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Check-in failed",
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: "Check-in successful!",
      data,
    };
  } catch (error: any) {
    console.error("verifyCheckIn error:", error);
    return {
      success: false,
      message: error.message || "Network error occurred",
    };
  }
}
