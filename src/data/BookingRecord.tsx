export type BookingRecord = {
  id: number
  attributes: {
    users_permissions_user: {
      data: {
        id: number
        attributes: {
          email: string
          firstName: string
          lastName: string
        }
      }
    }
    from: string
    to: string
  }
}
