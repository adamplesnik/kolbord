import { FieldApi } from '@tanstack/react-form'
import { Check, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../basic/Badge'
import { useFeaturesQuery } from './loadFeatures'

const SpaceEditFeatures = ({ field, handleSubmit }: SpaceEditFeaturesProps) => {
  const { data: allFeatures } = useFeaturesQuery()

  return (
    <>
      {allFeatures?.data.map((all) => {
        const index = field.state.value.findIndex((s) => s.id === all.id)
        const isActive = index > -1
        const [mouseOut, setMouseOut] = useState(false)
        const onClick = () => {
          if (!isActive) {
            field.pushValue({
              id: all.id,
              attributes: { description: '', lucideIcon: 'cog' },
            })
          } else {
            field.removeValue(index)
            setMouseOut(false)
          }
          handleSubmit()
        }

        return (
          <Badge
            className={
              'group flex cursor-pointer gap-1 truncate border hover:bg-slate-200 active:bg-slate-300' +
              addWithSpace(isActive ? 'border-slate-400' : 'border-transparent')
            }
            onMouseLeave={() => isActive && setMouseOut(true)}
            onClick={onClick}
          >
            <span
              className={
                '-mt-px flex flex-col self-start transition-transform duration-500' +
                addWithSpace(isActive ? '-translate-y-8' : 'translate-y-0') +
                addWithSpace(isActive && mouseOut && 'group-hover:-translate-y-16')
              }
            >
              <Plus
                strokeWidth={2.5}
                className={
                  'size-4 h-8 text-emerald-600' +
                  addWithSpace(isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100')
                }
              />
              <Check strokeWidth={2} className="size-4 h-8 text-slate-800" />
              <Trash2 strokeWidth={1.5} className="size-4 h-8 text-pink-600" />
            </span>
            {all.attributes.description}
          </Badge>
        )
      })}
    </>
  )
}

type SpaceEditFeaturesProps = {
  field: FieldApi<TableRecord, 'attributes.features.data', undefined, undefined, FeatureRecord[]>
  handleSubmit: () => Promise<void>
}

export default SpaceEditFeatures
