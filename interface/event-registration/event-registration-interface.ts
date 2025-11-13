export interface EventLocationCoords {
    latitude: number | null
    longitude: number | null
}

export interface CheckInParams {
    eventId: string
    locationId: string
    latitude: number | null
    longitude: number | null
    faceImageBase64: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}

export interface PingingParams {
    eventId: string
    locationId: string
    setIsPinging: React.Dispatch<React.SetStateAction<boolean>>
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>
    setLastPingTime?: React.Dispatch<React.SetStateAction<string | null>>
}

export interface StopPingingParams {
    setIsPinging: React.Dispatch<React.SetStateAction<boolean>>
}
