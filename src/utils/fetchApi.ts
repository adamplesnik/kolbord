import { BookingRecord } from '../data/BookingRecord'
import { TableRecord } from '../data/TableRecord'

type TableQueryType = {
  data: TableRecord[]
}

export const loadTables = async (): Promise<TableQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/tables?populate[features][fields][0]=id&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&populate[group][fields][0]=name&publicationState=live&locale[0]=en`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
      },
    }
  )
  return response.json()
}

type TableSingleQueryType = {
  data: TableRecord
}

export const loadTable = async (id: number): Promise<TableSingleQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/tables/${id}?populate[features][fields][0]=id&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&populate[group][fields][0]=name&publicationState=live&locale[0]=en`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
      },
    }
  )
  return response.json()
}

type BookingQueryType = {
  data: BookingRecord[]
}

export const loadBookings = async (): Promise<BookingQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/bookings?populate[table][fields][0]=uuid&populate[users_permissions_user][fields][0]=email&fields[0]=from&fields[1]=to`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
      },
    }
  )
  return response.json()
}

export const loadBookingsForTable = async (uuid: string | undefined): Promise<BookingQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/bookings?populate[table][fields][0]=uuid&populate[users_permissions_user][fields][0]=email&fields[0]=from&fields[1]=to&filters[table][uuid]=${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
      },
    }
  )
  return response.json()
}

// type FeatureQueryType = {
//   data: FeatureRecord[]
// }

export const loadUser = async (id: number): Promise<any> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
    },
  })
  return response.json()
}
