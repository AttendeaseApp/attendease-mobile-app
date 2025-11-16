import { eventRegistrationEventHandler } from '../register/event-registration-handler'
import { startAttendanceTracking } from '../pings/start-attendance-tracking'
import { stopAttendanceTracking } from '../pings/stop-attendance-tracking'
import { getCurrentLocation } from '../geolocation/get-current-location'
import { UseEventRegistrationReturn } from '../../../interface/event-registration/event-registration-interface'
import { useEffect, useRef, useState } from 'react'

/**
 * Manages event registration and automated attendance pinging.
 *
 * Responsibilities:
 * - Fetch device GPS location
 * - Submit event registration
 * - Start/stop background attendance pinging every 1 minute
 *
 * @param eventId - The event being registered
 * @param locationId - The event’s assigned geofenced location
 */
export function useEventRegistration(
    eventId: string,
    locationId: string,
): UseEventRegistrationReturn {
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(true)
    const [isPinging, setIsTracking] = useState(false)
    const [lastPingTime, setLastPingTime] = useState<string | null>(null)
    const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        getCurrentLocation(setLocationLoading, setLatitude, setLongitude)

        return () => {
            if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
        }
    }, [])

    const startPinging = () => {
        pingIntervalRef.current = startAttendanceTracking({
            eventId,
            locationId,
            setIsTracking,
            setLatitude,
            setLongitude,
            setLastPingTime,
        })
    }

    const stopPinging = () => {
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current)
            pingIntervalRef.current = null
        }
        stopAttendanceTracking({ setIsTracking })
    }

    const register = () => {
        eventRegistrationEventHandler({
            eventId,
            locationId,
            latitude,
            longitude,
            setLoading,
            onSuccess: startPinging,
        })
    }

    return {
        latitude,
        longitude,
        loading,
        locationLoading,
        isPinging,
        lastPingTime,
        register,
        stopPinging,
    }
}
