export type BookingQueryType = {
  data: BookingRecord[]
}

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
    table: {
      data: {
        id: number
        attributes?: {
          name?: string
          group?: {
            data: {
              attributes: {
                name: string
              }
            }
          }
          plan?: {
            data: {
              id: number
              attributes: {
                name: string
              }
            }
          }
        }
      }
    }
    from: string
    to: string
  }
}
