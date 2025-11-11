import { EventLocation } from "./EventLocation";

export enum EventStatus {
    UPCOMING = "UPCOMING",
    REGISTRATION = "REGISTRATION",
    ONGOING = "ONGOING",
    CONCLUDED = "CONCLUDED",
    CANCELLED = "CANCELLED",
    FINALIZED = "FINALIZED",
}

export interface Event {
    eventId: string;
    eventName: string;
    eventStatus: EventStatus;
    description: string;
    timeInRegistrationStartDateTime: string;
    startDateTime: string;
    endDateTime: string;
    eventLocation: EventLocation;
    locationId?: string;
    createdAt?: string;
    updatedAt?: string;
}
