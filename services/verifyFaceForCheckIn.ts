import { authFetch } from "./authFetch";

interface VerifyFaceResponse {
  success: boolean;
  message?: string;
}

export async function verifyFaceForCheckIn(
  imageBase64: string,
  eventId: string,
  locationId: string,
  latitude: number,
  longitude: number
): Promise<VerifyFaceResponse> {
  const formData = new FormData();
  const imageBlob = await (await fetch(imageBase64)).blob();
  formData.append("image", imageBlob, "face.jpg");
  formData.append("eventId", eventId);
  formData.append("locationId", locationId);
  formData.append("latitude", latitude.toString());
  formData.append("longitude", longitude.toString());

  try {
    const response = await authFetch("/api/checkin", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": undefined },
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: result.message || "Checked in successfully",
      };
    } else {
      return { success: false, message: result.message || "Check-in failed" };
    }
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, message: "Network error" };
  }
}
