export type BookingRecord = {
  id: number
  attributes: {
    users_permissions_user: {
      data: {
        id: number
        attributes: {
          email: string
          name: string
          surname: string
        }
      }
    }
    from: string
    to: string
  }
}
