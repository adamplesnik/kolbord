import { FieldApi } from '@tanstack/react-form'
import { Check, Plus, X } from 'lucide-react'
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
        return (
          <Badge
            className={
              'group flex cursor-pointer gap-1 truncate hover:bg-slate-200 active:bg-slate-300' +
              addWithSpace(isActive && 'bg-slate-100')
            }
            onClick={() => {
              !isActive ?
                field.pushValue({
                  id: all.id,
                  attributes: { description: '', lucideIcon: 'cog' },
                })
              : field.removeValue(index)
              handleSubmit()
            }}
          >
            <span
              className={
                '-mt-px flex -translate-y-8 flex-col self-start transition-transform duration-500 ease-in-out' +
                addWithSpace(isActive ? 'group-hover:-translate-y-16' : 'translate-y-0')
              }
            >
              <Plus
                strokeWidth={2.5}
                className={
                  'size-4 h-8 text-emerald-600' +
                  addWithSpace(isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')
                }
              />
              <Check strokeWidth={2} className="size-4 h-8 text-slate-800" />
              <X strokeWidth={2} className="size-4 h-8 text-pink-600" />
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
