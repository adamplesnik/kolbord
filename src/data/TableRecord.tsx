import { FeatureRecord } from './FeatureRecord'
import { GroupRecord } from './GroupRecord'
import { PlanRecord } from './PlanRecord'

export type TableRecord = {
  id: number
  attributes: {
    name: string
    rotation: number
    x: number
    y: number
    group: {
      data: GroupRecord
    }
    plan?: {
      data: PlanRecord
    }
    available: boolean
    width: number
    height: number
    rounded: boolean
    chairs: number
    slots: string
    features: {
      data: FeatureRecord[]
    }
  }
  active?: boolean | undefined
}
