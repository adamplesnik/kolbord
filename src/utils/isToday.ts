export const isToday = (compareWith: Date) => {
  if (compareWith) {
    return compareWith && new Date().toDateString() === compareWith.toDateString()
  }
}
