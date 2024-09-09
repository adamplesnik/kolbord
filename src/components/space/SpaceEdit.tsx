import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTMLAttributes, useEffect, useState } from 'react'
import { getToken } from '../../auth/helpers'
import { TableRecord } from '../../data/TableRecord'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import CheckboxWithLabel from '../basic/CheckboxWithLabel.tsx'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import SpaceDelete from './SpaceDelete.tsx'
import { useFeaturesQuery } from './loadFeatures.ts'

const SpaceEdit = ({ table, planId, handleDelete }: SpaceEditProps) => {
  const updateTable = async (id: number, data: TableRecord): Promise<TableRecord> => {
    const payload = {
      name: data.attributes.name,
      x: data.attributes.x,
      y: data.attributes.y,
      slots: data.attributes.slots,
      features: currentFeatures,
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

  const { data: allFeatures } = useFeaturesQuery()
  const [currentFeatures, setCurrentFeatures] = useState(
    table?.attributes.features.data.map((d) => d.id)
  )

  useEffect(() => {
    setCurrentFeatures(table?.attributes.features.data.map((d) => d.id))
  }, [table])

  const handleFeatureChange = (id: number) => {
    setCurrentFeatures((prevFeatures) =>
      prevFeatures.includes(id) ?
        prevFeatures.filter((featureId) => featureId !== id)
      : [...prevFeatures, id]
    )
  }

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
        features: {
          data: [],
        },
      },
    },
  })

  useEffect(() => {
    reset()
  }, [table])

  const saveLatestMetadata = (data: TableRecord) => {
    const metadata = [data.attributes.x, data.attributes.y]
    localStorage.setItem(LATEST_PLACE_METADATA, metadata.join())
  }

  const queryClient = useQueryClient()

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
          <span className="text-sm font-bold">Features</span>
          <div className="flex flex-col gap-0.5">
            {allFeatures?.data.map((f) => (
              <CheckboxWithLabel
                key={`feature_checkbox${f.id}`}
                checked={currentFeatures.includes(f.id)}
                label={allFeatures?.data.find((a) => a.id === f.id)?.attributes.description}
                onBlur={() => handleFeatureChange(f.id)}
                onChange={() => handleFeatureChange(f.id)}
              />
            ))}
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
