import { AttendanceStatus } from '../status/attendance-status-interface'

export interface AttendanceHistory {
    eventId: string
    eventName: string
    timeIn: string
    timeOut: string
    attendanceStatus: AttendanceStatus
    reason: string
}
