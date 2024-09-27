import { useAuth } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { HTMLAttributes, useEffect } from 'react'
import { GroupRecord } from '../../types/groupType'
import { SpaceType } from '../../types/spaceType'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import { useZone } from '../plan/useZone.ts'
import SpaceEditFeatures from './SpaceEditFeatures.tsx'

const SpaceEdit = ({ space, sendTitle }: SpaceEditProps) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const { zoneId } = useZone()

  const { data: allGroups } = useQuery<{ data: { docs: GroupRecord[] } }>({
    queryKey: ['groups', zoneId],
    enabled: true,
  })

  useEffect(() => {
    sendTitle(space.name)
  }, [sendTitle, space.name])

  const { Field, handleSubmit, reset } = useForm<SpaceType>({
    onSubmit: async ({ value }) => {
      mutate(value)
      saveLatestMetadata(value)
    },
    defaultValues: {
      id: space?.id,
      name: space?.name,
      x: space?.x,
      y: space?.y,
      slots: space?.slots,
      features: space.features,
      group: {
        value: space?.group?.value || undefined,
      },
    },
  })

  useEffect(() => {
    reset()
  }, [space, reset])

  const updateTable = async (id: number, space: SpaceType): Promise<SpaceType> => {
    const payload = {
      name: space.name,
      x: space.x,
      y: space.y,
      slots: space.slots,
      features: space.features?.map((feature) => ({
        relationTo: 'space-features',
        value: feature?.value?.id,
      })),
      ...(space.group?.value?.id && {
        group: {
          relationTo: 'zone-groups',
          value: space.group?.value && space.group.value.id > 0 ? space.group.value.id : undefined,
        },
      }),
    }

    return await axios.patch(
      `${import.meta.env.VITE_API_URL}/spaces/${id}`,
      JSON.stringify(payload),
      {
        method: 'put',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const saveLatestMetadata = (data: SpaceType) => {
    const metadata = [data.x, data.y]
    localStorage.setItem(LATEST_PLACE_METADATA, metadata.join())
  }

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: SpaceType) => updateTable(space.id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spaces', zoneId],
      })
      queryClient.invalidateQueries({
        queryKey: ['groups', zoneId],
      })
    },
  })

  return (
    <form
      onBlur={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="relative"
    >
      <FetchStatus isPending={isPending} isSuccess={isSuccess} isError={isError} />
      <div className="flex flex-col gap-4">
        <Field
          name="name"
          children={({ state, handleChange, handleBlur }) => (
            <InputWithLabel
              label="Name"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              required
              inputType="text"
            />
          )}
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">Group</span>
          <div className="flex gap-1">
            <Field
              name={`group`}
              mode="array"
              children={(field) => (
                <select
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.setValue({
                      value: {
                        id: +e.target.value,
                        name: '',
                      },
                    })
                  }
                  className="w-full appearance-none rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
                  value={field?.state.value ? field.state.value?.value?.id : ''}
                >
                  <option value={0}>(none)</option>
                  {allGroups?.data.docs.map((all) => (
                    <option key={`group_option${all.id}`} value={all.id}>
                      {all.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Field
            name="x"
            children={({ state, handleChange, handleBlur }) => (
              <InputWithLabel
                label="X"
                value={state.value}
                required
                onChange={(e) => handleChange(+e.target.value)}
                onBlur={handleBlur}
                inputType="number"
              />
            )}
          />
          <Field
            name="y"
            children={({ state, handleChange, handleBlur }) => (
              <InputWithLabel
                label="Y"
                value={state.value}
                required
                onChange={(e) => handleChange(+e.target.value)}
                onBlur={handleBlur}
                inputType="number"
              />
            )}
          />
        </div>
        <div>
          <Field
            name="slots"
            children={({ state, handleChange, handleBlur }) => (
              <label className="flex flex-col gap-1">
                <span className={'text-sm font-bold'}>Slots</span>
                <select
                  required
                  className="w-full appearance-none rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                >
                  <option value="wholeday">Whole day</option>
                  <option value="halfday">Half-day</option>
                  <option value="2hours">2 hours</option>
                  <option value="1hour">1 hour</option>
                  <option value="30minutes">30 minutes</option>
                </select>
              </label>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">Features</span>
          <div className="flex flex-wrap gap-0.5 text-sm">
            <Field
              name={'features'}
              mode="array"
              children={(field) => <SpaceEditFeatures field={field} handleSubmit={handleSubmit} />}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export type SpaceEditProps = {
  handleEdit: (space: SpaceType) => void
  sendTitle: (title: string | undefined) => void
  space: SpaceType
} & HTMLAttributes<HTMLDivElement>

export default SpaceEdit
