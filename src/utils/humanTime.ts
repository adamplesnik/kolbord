export const humanTime = (date: string | Date) => {
  return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })
}
