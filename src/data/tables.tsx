import { TableRecord } from './TableRecord'

export const tables: TableRecord[] = [
  {
    group: 'ORD',
    name: 'MMA',
    rotation: 0,
    x: 158,
    y: 65,
    available: false,
  },
  {
    group: 'ORD',
    name: 'MVA',
    rotation: 0,
    x: 318,
    y: 65,
    available: false,
  },
  {
    group: 'ORD',
    name: 2,
    rotation: 180,
    x: 158,
    y: 225,
    features: [0, 2],
  },
  {
    group: 'ORD',
    name: 3,
    rotation: 180,
    x: 318,
    y: 225,
    features: [0, 1],
  },
  {
    group: 'ORD',
    name: 4,
    rotation: 90,
    x: 350,
    y: 548,
    features: [0, 1, 2, 3],
  },
  {
    group: 'Flex',
    name: 1,
    rotation: 270,
    x: 5869,
    y: 1,
    features: [0, 1, 2, 3],
  },
]
