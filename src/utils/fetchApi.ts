import { getToken } from '../auth/helpers'
import { TableRecord } from '../data/TableRecord'

type TableQueryType = {
  data: TableRecord[]
}

export const loadTables = async (planId: number): Promise<TableQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/tables?populate[features][fields][0]=description&populate[features][fields][1]=lucideIcon&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&fields[8]=chairs&populate[group][fields][0]=name&publicationState=live&locale[0]=en&filters[plan][id][$eq]=${planId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
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
    `${import.meta.env.VITE_API_URL}/tables/${id}?populate[features][fields][0]=description&populate[features][fields][1]=lucideIcon&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&fields[8]=chairs&fields[9]=slots&populate[group][fields][0]=name&populate[group][fields][1]=description&publicationState=live&locale[0]=en`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.json()
}
