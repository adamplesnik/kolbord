import { useAuth } from '@clerk/clerk-react'
import { FieldApi } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Check, Plus, Trash2 } from 'lucide-react'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../basic/Badge'
import { FeatureType, RelationshipType, SpaceType } from './spaceType'

const SpaceEditFeatures = ({ field, handleSubmit }: SpaceEditFeaturesProps) => {
  const { getToken } = useAuth()

  const loadFeatures = async (): Promise<{ data: { docs: FeatureType[] } }> => {
    return await axios.get(`${import.meta.env.VITE_API_URL}/space-features?sort=name`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const { data: allFeatures } = useQuery({
    queryKey: ['features'],
    queryFn: () => loadFeatures(),
  })

  return (
    <>
      {allFeatures &&
        allFeatures.data.docs.map((feature) => {
          const index = field.state.value?.findIndex((field) => field?.value?.id === feature.id)
          const isActive = index !== undefined && index > -1
          // const [mouseOut, setMouseOut] = useState(false)
          const onClick = () => {
            if (!isActive) {
              field.pushValue({
                value: {
                  id: feature.id || 0,
                  name: '',
                  lucideIcon: 'cog',
                },
              })
            } else {
              field.removeValue(index)
              // setMouseOut(false)
            }
            handleSubmit()
          }

          return (
            <Badge
              className={
                'group flex cursor-pointer gap-1 truncate border hover:bg-slate-200 active:bg-slate-300' +
                addWithSpace(isActive ? 'border-slate-400' : 'border-transparent')
              }
              // onMouseLeave={() => isActive && setMouseOut(true)}
              onClick={onClick}
              key={`${feature.id}_${feature.name}`}
            >
              <span
                className={
                  '-mt-px flex flex-col self-start transition-transform duration-500' +
                  addWithSpace(isActive ? '-translate-y-8' : 'translate-y-0') +
                  addWithSpace(isActive && 'group-hover:-translate-y-16')
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
              {feature.name}
            </Badge>
          )
        })}
    </>
  )
}

type SpaceEditFeaturesProps = {
  field: FieldApi<SpaceType, 'features', undefined, undefined, RelationshipType[] | undefined>
  handleSubmit: () => Promise<void>
}

export default SpaceEditFeatures
