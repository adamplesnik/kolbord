export const getTableId = (name: string | number, group?: string | number | undefined) => {
  let id = ''
  group && (id = group + '_')
  id += name

  return id
}
