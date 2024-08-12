import { FeatureRecord } from './FeatureRecord'
import { GroupRecord } from './GroupRecord'

export type TableRecord = {
  id: number
  attributes: {
    name: string | number
    rotation: string
    x: number
    y: number
    group: {
      data: GroupRecord
    }
    available: boolean
    width: number
    height: number
    rounded: boolean
    features: {
      data: FeatureRecord[]
    }
  }
  active?: boolean | undefined
}
