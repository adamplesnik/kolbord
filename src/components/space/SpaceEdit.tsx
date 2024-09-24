import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTMLAttributes, useEffect } from 'react'
import { getOldToken } from '../../auth/helpers'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import { useGroupsForPlanQuery } from '../group/groupFetch.ts'
import SpaceDelete from './SpaceDelete.tsx'
import { SpaceType } from './spaceType'

const SpaceEdit = ({ table, planId, handleDelete }: SpaceEditProps) => {
  const queryClient = useQueryClient()

  const { data: allGroups } = useGroupsForPlanQuery(planId)

  const { Field, handleSubmit, reset } = useForm<SpaceType>({
    onSubmit: async ({ value }) => {
      mutate(value)
      saveLatestMetadata(value)
    },
    defaultValues: {
      id: table?.id,
      name: table?.name,
      x: table?.x,
      y: table?.y,
      slots: table?.slots,
      // features: {
      //   value: table.features.
      // },
      group: {
        value: table.group.value,
      },
    },
  })

  useEffect(() => {
    reset()
  }, [table, reset])

  const updateTable = async (id: number, data: SpaceType): Promise<SpaceType> => {
    const payload = {
      name: data.name,
      x: data.x,
      y: data.y,
      slots: data.slots,
      // features: data.features.data.map((f) => f.id),
      group: data.group.value.id > 0 ? data.group.value.id : undefined,
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tables/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${getOldToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    })
    return response.json()
  }

  const saveLatestMetadata = (data: SpaceType) => {
    const metadata = [data.x, data.y]
    localStorage.setItem(LATEST_PLACE_METADATA, metadata.join())
  }

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: SpaceType) => updateTable(table.id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] })
      await queryClient.cancelQueries({ queryKey: ['space'] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spaces', planId],
      })
      queryClient.invalidateQueries({
        queryKey: ['space', table.id],
      })
      queryClient.invalidateQueries({
        queryKey: ['groups', planId],
      })
    },
  })

  return (
    <>
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
                    value={+field.state.value ? +field.state.value : ''}
                  >
                    <option value={0}>(none)</option>
                    {allGroups?.data.map((all) => (
                      <option key={`group_option${all.id}`} value={all.id}>
                        {all.attributes.name}
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
          {/* <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">Features</span>
            <div className="flex flex-wrap gap-0.5 text-sm">
              <Field
                name={`features.data`}
                mode="array"
                children={(field) => (
                  <SpaceEditFeatures field={field} handleSubmit={handleSubmit} />
                )}
              />
            </div>
          </div> */}
        </div>
      </form>
      <SpaceDelete id={table.id} handleDelete={handleDelete} />
    </>
  )
}

export type SpaceEditProps = {
  table: SpaceType
  planId: number
  handleDelete: () => void
} & HTMLAttributes<HTMLDivElement>

export default SpaceEdit
