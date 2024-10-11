export const humanDate = (date: Date | string) => {
  return new Date(date).toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const humanDayName = (date: Date | string) => {
  const todayString = new Date().toDateString()
  const tomorrowString = new Date(+new Date() + 86400000).toDateString()

  if (todayString === new Date(date).toDateString()) {
    return 'Today'
  } else if (tomorrowString === new Date(date).toDateString()) {
    return 'Tomorrow'
  } else {
    return new Date(date).toLocaleString([], { weekday: 'short' })
  }
}

export const humanTime = (date: Date | string) => {
  return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })
}
