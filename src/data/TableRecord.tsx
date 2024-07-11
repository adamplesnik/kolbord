import { FeatureRecord } from './FeatureRecord'

export type TableRecord = {
  id: number
  attributes: {
    name: string | number
    rotation: string
    x: number
    y: number
    group?: string | number | undefined
    features: FeatureRecord[]
    available?: boolean | undefined
    width: number
    height: number
    rounded?: boolean | undefined
  }
  active?: boolean | undefined
}
