import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import clsx from 'clsx'
import { Check, Plus, Trash2 } from 'lucide-react'
import { FeatureType } from '../../types/spaceType'
import Badge from '../basic/Badge'

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
          const index = field.state.value?.findIndex(
            (field: { value: { id: number } }) => field?.value?.id === feature.id
          )
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
              className={clsx(
                'group flex cursor-pointer gap-1 truncate border hover:bg-zinc-200 active:bg-zinc-300',
                isActive ? 'border-zinc-400' : 'border-transparent'
              )}
              // onMouseLeave={() => isActive && setMouseOut(true)}
              onClick={onClick}
              key={`${feature.id}_${feature.name}`}
            >
              <span
                className={clsx(
                  '-mt-px flex flex-col self-start transition-transform duration-500',
                  isActive ? '-translate-y-8' : 'translate-y-0',
                  isActive && 'group-hover:-translate-y-16'
                )}
              >
                <Plus
                  strokeWidth={2.5}
                  className={clsx(
                    'size-4 h-8 text-emerald-600',
                    isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                  )}
                />
                <Check strokeWidth={2} className="size-4 h-8 text-zinc-800" />
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
  field: any
  handleSubmit: () => Promise<void>
}

export default SpaceEditFeatures
