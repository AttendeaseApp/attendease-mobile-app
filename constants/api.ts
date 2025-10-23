// backend local host
export const API_BASE_URL = "https://attendease-backend-latest.onrender.com";

// backend login controller endpoint
export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/student/login`;

// backend endpoint to retrieve ongoing events endpoint
export const RETRIEVE_ONGOING_EVENTS = `${API_BASE_URL}/api/checkin/events`;

// backend endpoint to retrieve user profile endpoint
export const RETRIVE_USER_PROFILE = `${API_BASE_URL}/api/profile/user-student/me`;

export const REGISTER_FACE = `${API_BASE_URL}/api/auth/biometrics/register-face-image`;

export const CHECK_IN = `${API_BASE_URL}/api/checkin`;
