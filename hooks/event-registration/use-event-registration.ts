import {
    fetchLocation, // gets phone GPS
    handleCheckIn,
    startPingingAttendanceLogs,
    stopPingingAttendanceLogs,
} from '@/services/event-registration-services'
import { useEffect, useRef, useState, useCallback } from 'react'

export function useEventCheckIn(eventId: string, locationId: string) {
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(true)
    const [isPinging, setIsPinging] = useState(false)
    const [lastPingTime, setLastPingTime] = useState<string | null>(null)
    const [checkedIn, setCheckedIn] = useState(false)
    const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        fetchLocation(setLocationLoading, setLatitude, setLongitude)
        return () => {
            if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
        }
    }, [])

    const startPinging = useCallback(() => {
        if (pingIntervalRef.current) return
        pingIntervalRef.current = startPingingAttendanceLogs({
            eventId,
            locationId,
            setIsPinging,
            setLatitude,
            setLongitude,
            setLastPingTime,
        })
    }, [eventId, locationId])

    const stopPinging = useCallback(() => {
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current)
            pingIntervalRef.current = null
        }
        stopPingingAttendanceLogs({ setIsPinging })
    }, [])

    const performCheckIn = useCallback(
        async (faceImageBase64: string) => {
            if (!latitude || !longitude) return
            await handleCheckIn({
                eventId,
                locationId,
                latitude,
                longitude,
                faceImageBase64,
                setLoading,
                onSuccess: () => {
                    startPinging()
                },
            })
        },
        [latitude, longitude, eventId, locationId, startPinging],
    )

    return {
        latitude,
        longitude,
        loading,
        locationLoading,
        isPinging,
        lastPingTime,
        performCheckIn,
        stopPinging,
    }
}
