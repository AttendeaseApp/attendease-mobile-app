export interface RegistrationParams {
    eventId: string
    locationId: string
    latitude: number | null
    longitude: number | null
    faceImageBase64: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}
