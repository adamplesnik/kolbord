import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTMLAttributes, useEffect } from 'react'
import { getToken } from '../../auth/helpers'
import { TableRecord } from '../../data/TableRecord'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import { useGroupsForPlanQuery } from '../group/loadGroup.ts'
import SpaceDelete from './SpaceDelete.tsx'
import SpaceEditFeatures from './SpaceEditFeatures.tsx'

const SpaceEdit = ({ table, planId, handleDelete }: SpaceEditProps) => {
  const queryClient = useQueryClient()

  const { data: allGroups } = useGroupsForPlanQuery(planId)

  const { Field, handleSubmit, reset } = useForm<TableRecord>({
    onSubmit: async ({ value }) => {
      mutate(value)
      saveLatestMetadata(value)
    },
    defaultValues: {
      id: table?.id,
      attributes: {
        name: table?.attributes.name,
        x: table?.attributes.x,
        y: table?.attributes.y,
        slots: table?.attributes.slots,
        features: {
          data: table?.attributes.features.data || [],
        },
        group: {
          data: table?.attributes.group.data || 0,
        },
      },
    },
  })

  useEffect(() => {
    reset()
  }, [table, reset])

  const updateTable = async (id: number, data: TableRecord): Promise<TableRecord> => {
    const payload = {
      name: data.attributes.name,
      x: data.attributes.x,
      y: data.attributes.y,
      slots: data.attributes.slots,
      features: data.attributes.features.data.map((f) => f.id),
      group: data.attributes.group.data.id > 0 ? [data.attributes.group.data.id] : [],
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tables/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    })
    return response.json()
  }

  const saveLatestMetadata = (data: TableRecord) => {
    const metadata = [data.attributes.x, data.attributes.y]
    localStorage.setItem(LATEST_PLACE_METADATA, metadata.join())
  }

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: TableRecord) => updateTable(table.id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['places'] })
      await queryClient.cancelQueries({ queryKey: ['place'] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['places', planId],
      })
      queryClient.invalidateQueries({
        queryKey: ['place', table.id],
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
            name="attributes.name"
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
                name={`attributes.group.data`}
                mode="array"
                children={(field) => (
                  <select
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.setValue({
                        id: +e.target.value,
                        attributes: {
                          name: '',
                          description: '',
                          x: 0,
                          y: 0,
                          showMarker: false,
                        },
                      })
                    }
                    className="w-full appearance-none rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
                    value={field.state.value ? field.state.value.id : ''}
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
              name="attributes.x"
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
              name="attributes.y"
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
              name="attributes.slots"
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
                    <option value="hours2">2 hours</option>
                    <option value="hours1">1 hour</option>
                    <option value="minutes30">30 minutes</option>
                  </select>
                </label>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">Features</span>
            <div className="flex flex-wrap gap-0.5 text-sm">
              <Field
                name={`attributes.features.data`}
                mode="array"
                children={(field) => (
                  <SpaceEditFeatures field={field} handleSubmit={handleSubmit} />
                )}
              />
            </div>
          </div>
        </div>
      </form>
      <SpaceDelete id={table.id} handleDelete={handleDelete} />
    </>
  )
}

export type SpaceEditProps = {
  table: TableRecord
  planId: number
  handleDelete: () => void
} & HTMLAttributes<HTMLDivElement>

export default SpaceEdit
