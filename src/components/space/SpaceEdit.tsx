import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, Plus, X } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { getToken } from '../../auth/helpers'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace.ts'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import Badge from '../basic/Badge.tsx'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import { useFeaturesQuery } from './loadFeatures.ts'
import SpaceDelete from './SpaceDelete.tsx'

const SpaceEdit = ({ table, planId, handleDelete }: SpaceEditProps) => {
  const queryClient = useQueryClient()

  const { data: allFeatures } = useFeaturesQuery()

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
          data: {
            id: 0,
            attributes: {
              name: '',
              description: '',
              x: 0,
              y: 0,
            },
          },
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
        <div className="flex flex-col gap-2">
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
                              addWithSpace(
                                isActive ? 'group-hover:-translate-y-16' : 'translate-y-0'
                              )
                            }
                          >
                            <Plus
                              strokeWidth={2.5}
                              className={
                                'size-4 h-8 text-emerald-600' +
                                addWithSpace(
                                  isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'
                                )
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
