export const isToday = (compareWith: string) => {
  if (compareWith) {
    return compareWith && new Date().toDateString() === new Date(compareWith).toDateString()
  }
}
