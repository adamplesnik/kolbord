import axios from 'axios'
import { getOldToken } from '../auth/helpers'
import { TableRecord } from '../data/TableRecord'

export const loadTable = async (id: number): Promise<{ data: { docs: TableRecord } }> => {
  return axios.get(`${import.meta.env.VITE_API_PAYLOAD_URL}/spaces/${id}`, {
    headers: {
      Authorization: `Bearer ${getOldToken()}`,
    },
  })
}
