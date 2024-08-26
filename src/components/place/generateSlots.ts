const generateSlots = (date: Date, startHours: number, endHours: number, stepHours: number) => {
  const slots = []
  let currentTime = new Date(date)
  currentTime.setHours(startHours, 0, 0, 0)

  while (currentTime.getHours() + currentTime.getMinutes() / 60 < endHours) {
    const startSlot = new Date(currentTime)
    currentTime.setMinutes(currentTime.getMinutes() + stepHours * 60)
    const endSlot = new Date(currentTime)

    slots.push({
      slot: {
        from: startSlot,
        to: endSlot,
      },
    })
  }

  return slots
}

export const getSlots = (date: Date, slots: string) => {
  switch (slots) {
    case 'whole day':
      return generateSlots(date, 6, 18, 12)
    case 'half-day':
    default:
      return generateSlots(date, 6, 18, 6)
    case 'hours 2':
      return generateSlots(date, 6, 18, 2)
    case 'hour 1':
      return generateSlots(date, 6, 18, 1)
    case 'minutes 30':
      return generateSlots(date, 6, 18, 0.5)
  }
}
