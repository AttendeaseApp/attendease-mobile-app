import AsyncStorage from "@react-native-async-storage/async-storage";

export async function authFetch(url: string, options: any = {}) {
  const token = await AsyncStorage.getItem("authToken");
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  } else {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
