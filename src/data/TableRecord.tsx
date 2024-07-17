import { FeatureRecord } from './FeatureRecord'
import { GroupRecord } from './GroupRecord'

export type TableRecord = {
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
    uuid: string
    features: {
      data: FeatureRecord[]
    }
  }
  active?: boolean | undefined
}
