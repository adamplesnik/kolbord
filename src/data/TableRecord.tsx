import { FeatureRecord } from './FeatureRecord'

export type TableRecord = {
  attributes: {
    name: string | number
    rotation: string
    x: number
    y: number
    group?: string | number | undefined
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
