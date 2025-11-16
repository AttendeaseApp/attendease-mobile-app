import { useEffect, useState } from 'react'
import { eventRegistrationEventHandler } from '../_register/event-registration-handler'
import { getCurrentLocation } from '../_geolocation/get-current-location'

/**
 * Manages event registration and location.
 * Tracking is now handled by AttendanceTrackingContext.
 *
 * @param eventId - The event being registered
 * @param locationId - The event's assigned geofenced location
 */
export function useEventRegistration(eventId: string, locationId: string) {
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(true)

    useEffect(() => {
        getCurrentLocation(setLocationLoading, setLatitude, setLongitude)
    }, [])

    const register = (onSuccess?: () => void) => {
        eventRegistrationEventHandler({
            eventId,
            locationId,
            latitude,
            longitude,
            setLoading,
            onSuccess: onSuccess || (() => {}),
        })
    }

    return {
        latitude,
        longitude,
        loading,
        locationLoading,
        register,
    }
}
