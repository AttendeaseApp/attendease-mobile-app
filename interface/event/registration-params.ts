export interface RegistrationParams {
    eventId: string
    locationId: string
    latitude: number | null
    longitude: number | null
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}
