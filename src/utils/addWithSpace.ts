export const addWithSpace = (value: string | undefined | any, condition?: boolean | undefined) => {
  if (condition != undefined && condition) {
    return ` ${value}`
  } else if (condition != undefined && !condition) {
    return ''
  } else {
    return value ? ` ${value}` : ''
  }
}
