import { ArrowUpDown, Dock, Mouse, PcCase } from 'lucide-react'
import { FeatureRecord } from './FeatureRecord'

export const Features: FeatureRecord[] = [
  {
    id: 0,
    desc: 'Variable height',
    Icon: ArrowUpDown,
  },
  {
    id: 1,
    desc: 'Dock',
    Icon: Dock,
  },
  {
    id: 2,
    desc: 'Workstation',
    Icon: PcCase,
  },
  {
    id: 3,
    desc: 'Peripherals',
    Icon: Mouse,
  },
]
