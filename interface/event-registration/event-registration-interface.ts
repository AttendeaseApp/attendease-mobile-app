export interface EventLocationCoords {
    latitude: number | null
    longitude: number | null
}

export interface RegistrationParams {
    eventId: string
    locationId: string
    latitude: number | null
    longitude: number | null
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}

export interface AttendanceTrackingParams {
    eventId: string
    locationId: string
    setIsTracking: React.Dispatch<React.SetStateAction<boolean>>
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>
    setLastTrackingTime?: React.Dispatch<React.SetStateAction<string | null>>
}

export interface StopAttendanceTrackingParams {
    setIsTracking: React.Dispatch<React.SetStateAction<boolean>>
}

export interface LocationStatus {
    isInside: boolean
    message: string
}

export interface UseEventRegistrationReturn {
    latitude: number | null
    longitude: number | null
    loading: boolean
    locationLoading: boolean
    isTracking: boolean
    lastTrackingTime: string | null
    register: () => void
    stopTracking: () => void
}
