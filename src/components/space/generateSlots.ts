export function generateTimeSlots(date: Date, from: number, to: number): Date[] {
  const timeSlots: Date[] = []

  const slotDuration = 30
  const start = new Date(date)
  start.setHours(from, 0, 0, 0)

  const end = new Date(date)
  end.setHours(to, 0, 0, 0)

  while (start < end) {
    timeSlots.push(new Date(start.getTime()))
    start.setMinutes(start.getMinutes() + slotDuration)
  }

  return timeSlots
}
