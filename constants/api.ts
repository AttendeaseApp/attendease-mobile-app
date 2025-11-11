// backend local host
// export const API_BASE_URL = "http://localhost:8082";

// production backend URL
export const API_BASE_URL = "https://attendease-backend-latest.onrender.com";

// backend login controller endpoint
export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/student/login`;

// backend endpoint to retrieve ongoing events endpoint
export const RETRIEVE_ONGOING_EVENTS = `${API_BASE_URL}/api/registration/events`;

// backend endpoint to retrieve user profile endpoint
export const RETRIEVE_USER_PROFILE = `${API_BASE_URL}/api/profile/user-student/me`;

export const REGISTER_FACE = `${API_BASE_URL}/api/auth/biometrics/register-face-image`;

export const REGISTER_STUDENT_ON_EVENT_ENDPOINT = `${API_BASE_URL}/api/registration`;

export const PING_ATTENDANCE_ENDPOINT = `${API_BASE_URL}/api/registration/ping`;

export const CHECK_CURRENT_LOCATION = `${API_BASE_URL}/api/registration/check-location`;
