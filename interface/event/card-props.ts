import { EventStatus } from './status'
import { EventLocation } from '../locations/event-location'

export interface EventCardProps {
    eventName: string
    eventStatus: EventStatus
    timeInRegistrationStartDateTime: string
    startDateTime: string
    endDateTime: string
    locationId?: string
    eventLocation: EventLocation
    eventId: string
}
