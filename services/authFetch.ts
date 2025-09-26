import AsyncStorage from "@react-native-async-storage/async-storage";

export async function authFetch(url: string, options = {}) {
  const token = await AsyncStorage.getItem("authToken");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options as any).headers,
    },
  });
}

export async function logout() {
  await AsyncStorage.removeItem("authToken");
}
