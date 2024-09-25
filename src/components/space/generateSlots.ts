const generateSlots = (date: Date, startHours: number, endHours: number, stepHours: number) => {
  const slots = []
  const currentTime = new Date(date)
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
    case 'wholeday':
      return generateSlots(date, 6, 18, 12)
    case 'halfday':
      return generateSlots(date, 6, 18, 6)
    case '2hours':
      return generateSlots(date, 6, 18, 2)
    case '1hour':
      return generateSlots(date, 6, 18, 1)
    case '30minutes':
      return generateSlots(date, 6, 18, 0.5)
    default:
      return generateSlots(date, 6, 18, 6)
  }
}
