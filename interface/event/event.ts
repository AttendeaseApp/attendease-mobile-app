import { EventLocation } from '../locations/event-location'
import { EventStatus } from './status'

export interface Event {
    eventId: string
    eventName: string
    eventStatus: EventStatus
    description: string
    timeInRegistrationStartDateTime: string
    startDateTime: string
    endDateTime: string
    eventLocation: EventLocation
    locationId?: string
    createdAt?: string
    updatedAt?: string
}
