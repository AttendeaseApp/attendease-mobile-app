import { REGISTER_FACE } from "@/constants/api";
import { authFetch } from "./authFetch";

interface RegisterFaceResponse {
  success: boolean;
  message?: string;
}

export async function registerFaceWithImage(
  token: string,
  imageBase64: string
): Promise<RegisterFaceResponse> {
  try {
    const response = await fetch(imageBase64);
    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append("image", imageBlob, "face.jpg");

    const uploadResponse = await authFetch(`${REGISTER_FACE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await uploadResponse.text();

    if (uploadResponse.ok) {
      return { success: true, message: result };
    } else {
      return { success: false, message: result || "Registration failed" };
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return { success: false, message: "Network error. Check connection." };
  }
}
