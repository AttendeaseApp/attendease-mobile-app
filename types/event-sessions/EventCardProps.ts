import { EventLocation } from "./EventLocation";

export interface EventCardProps {
  eventName: string;
  eventStatus: string;
  startDateTime: string;
  endDateTime: string;
  locationId?: string;
  eventLocation: EventLocation;
  eventId: string;
}
