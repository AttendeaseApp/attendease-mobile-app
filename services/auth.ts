import { LOGIN_ENDPOINT } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(
  studentNumber: string,
  password: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentNumber, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      await AsyncStorage.setItem("authToken", data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message || "Invalid credentials" };
    }
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
}
