import { FeatureRecord } from './FeatureRecord'
import { GroupRecord } from './GroupRecord'
import { PlanRecord } from './PlanRecord'

export type TableRecord = {
  id: number
  attributes: {
    name: string
    x: number
    y: number
    group: {
      data: GroupRecord
    }
    plan?: {
      data: PlanRecord
    }
    slots: string
    features: {
      data: FeatureRecord[]
    }
  }
  active?: boolean | undefined
}
