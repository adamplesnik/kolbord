import { FeatureRecord } from '../data/FeatureRecord'
import { GroupMarkerRecord } from '../data/GroupMarkerRecord'
import { PlanRecord } from '../data/PlanRecord'
import { TableRecord } from '../data/TableRecord'

type TableQueryType = {
  data: TableRecord[]
}

export const loadTables = async (): Promise<TableQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/tables?populate[features][fields][0]=uuid&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&fields[8]=uuid&publicationState=live&locale[0]=en`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
      },
    }
  )
  return response.json()
}

type PlanQueryType = {
  data: PlanRecord
}

export const loadPlan = async (id: number): Promise<PlanQueryType> => {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/plans/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
    },
  })
  return response.json()
}

type GroupMarkerQueryType = {
  data: GroupMarkerRecord[]
}

export const loadMarkers = async (): Promise<GroupMarkerQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/group-markers?populate[group][fields][0]=name&fields[0]=x&fields[1]=y`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
      },
    }
  )
  return response.json()
}

type FeatureQueryType = {
  data: FeatureRecord[]
}

export const loadFeatures = async (): Promise<FeatureQueryType> => {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/features`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
    },
  })
  return response.json()
}
