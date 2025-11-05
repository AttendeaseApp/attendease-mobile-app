import { EventLocation } from "./EventLocation";

export interface Event {
  eventId: string;
  eventName: string;
  eventStatus: string;
  startDateTime: string;
  endDateTime: string;
  eventLocation: EventLocation;
  locationId?: string;
  createdAt?: string;
  updatedAt?: string;
}
