import { EventStatus } from "./Event";
import { EventLocation } from "./EventLocation";

export interface EventCardProps {
  eventName: string;
  eventStatus: EventStatus;
  timeInRegistrationStartDateTime: string;
  startDateTime: string;
  endDateTime: string;
  locationId?: string;
  eventLocation: EventLocation;
  eventId: string;
}
