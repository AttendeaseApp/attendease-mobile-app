import { EventLocation } from '../locations/event-location'
import { EventStatus } from './status'

export interface Event {
    eventId: string
    eventName: string
    eventStatus: EventStatus
    description?: string
    timeInRegistrationStartDateTime?: string
    startDateTime?: string
    endDateTime?: string
    eventLocation?: EventLocation
    locationId?: string
    eligibleStudents?: EligibilityCriteria
    facialVerificationEnabled?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface EligibilityCriteria {
    allStudents: boolean
    cluster?: string[]
    clusterNames?: string[]
    course?: string[]
    courseNames?: string[]
    sections?: string[]
    sectionNames?: string[]
}
