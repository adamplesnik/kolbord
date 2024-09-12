export const humanDate = (date: Date) => {
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const humanDayName = (date: Date) => {
  const todayString = new Date().toDateString()
  const tomorrowString = new Date(+new Date() + 86400000).toDateString()

  if (todayString === date.toDateString()) {
    return 'Today'
  } else if (tomorrowString === date.toDateString()) {
    return 'Tomorrow'
  } else {
    return date.toLocaleString([], { weekday: 'long' })
  }
}

export const humanTime = (date: string | Date) => {
  return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })
}
