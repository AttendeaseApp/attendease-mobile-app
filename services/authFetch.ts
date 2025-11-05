import AsyncStorage from "@react-native-async-storage/async-storage";

export async function authFetch(url: string, options: any = {}) {
  try {
    const token = await AsyncStorage.getItem("authToken");

    const headers: any = {
      ...(options.headers || {}),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    console.log("Making request to:", url);
    console.log("Has token:", !!token);
    console.log("Is FormData:", options.body instanceof FormData);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    return response;
  } catch (error) {
    console.error("authFetch error:", error);
    throw error;
  }
}
