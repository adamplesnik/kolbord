import { GroupRecord } from './GroupRecord'

export type GroupMarkerRecord = {
  id: number
  attributes: {
    x: number
    y: number
    group: {
      data: GroupRecord
    }
  }
}
