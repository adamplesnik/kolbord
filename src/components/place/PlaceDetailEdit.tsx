import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCheck, CloudOff, CloudUpload } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { getToken } from '../../auth/helpers'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import CheckboxWithLabel from '../basic/CheckboxWithLabel'
import InputWithLabel from '../basic/InputWithLabel'

const PlaceDetailEdit = ({ table }: PlaceDetailEditProps) => {
  const updateTable = async (id: number, data: TableRecord): Promise<TableRecord> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tables/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data.attributes }),
    })
    return response.json()
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
        width: table?.attributes.width,
        height: table?.attributes.height,
        rotation: table?.attributes.rotation,
        available: table?.attributes.available,
        rounded: table?.attributes.rounded,
        chairs: table?.attributes.chairs,
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
    const metadata = [
      data.attributes.width,
      data.attributes.height,
      data.attributes.x,
      data.attributes.y,
      data.attributes.rotation,
    ]
    localStorage.setItem(LATEST_PLACE_METADATA, metadata.join())
  }

  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: TableRecord) => updateTable(table.id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tables'] })
      await queryClient.cancelQueries({ queryKey: ['table'] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tables'],
      })
      queryClient.invalidateQueries({
        queryKey: ['table'],
      })
    },
  })

  return (
    <div>
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
        <div className="">
          <CloudUpload
            className={
              'absolute top-0 right-0 size-4 text-slate-500 transition-opacity' +
              addWithSpace(isPending ? 'opacity-100' : 'opacity-0')
            }
          />
          <CheckCheck
            className={
              'absolute top-0 right-0 size-5 text-green-500 transition-opacity' +
              addWithSpace(isSuccess ? 'opacity-100' : 'opacity-0')
            }
          />
          <CloudOff
            className={
              'absolute top-0 right-0 size-4 text-red-500 transition-opacity' +
              addWithSpace(isError ? 'opacity-100' : 'opacity-0')
            }
          />
        </div>
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
            <Field
              name="attributes.chairs"
              children={({ state, handleChange, handleBlur }) => (
                <InputWithLabel
                  label="Chairs"
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
                  <span className={'w-12 shrink-0 text-xs font-bold'}>Slots</span>
                  <select
                    required
                    className="w-full appearance-none rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option value="whole day">Whole day</option>
                    <option value="half-day">Half-day</option>
                    <option value="hours 2">2 hours</option>
                    <option value="hours 1">1 hour</option>
                    <option value="minutes 30">30 minutes</option>
                  </select>
                </label>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Field
              name="attributes.width"
              children={({ state, handleChange, handleBlur }) => (
                <InputWithLabel
                  label="Width"
                  value={state.value}
                  required
                  onChange={(e) => handleChange(+e.target.value)}
                  onBlur={handleBlur}
                  inputType="number"
                />
              )}
            />
            <Field
              name="attributes.height"
              children={({ state, handleChange, handleBlur }) => (
                <InputWithLabel
                  label="Height"
                  value={state.value}
                  required
                  onChange={(e) => handleChange(+e.target.value)}
                  onBlur={handleBlur}
                  inputType="number"
                />
              )}
            />
            <Field
              name="attributes.rotation"
              children={({ state, handleChange, handleBlur }) => (
                <InputWithLabel
                  label="Rotation"
                  value={state.value}
                  onChange={(e) => handleChange(+e.target.value)}
                  onBlur={handleBlur}
                  required
                  inputType="number"
                />
              )}
            />
          </div>
          <div className="flex gap-4 *:flex-1">
            <Field
              name="attributes.available"
              children={({ state, handleChange, handleBlur }) => (
                <CheckboxWithLabel
                  label="Available"
                  onChange={(e) => handleChange(e.target.checked)}
                  onBlur={handleBlur}
                  checked={state.value}
                />
              )}
            />
            <Field
              name="attributes.rounded"
              children={({ state, handleChange, handleBlur }) => (
                <CheckboxWithLabel
                  label="Rounded"
                  onChange={(e) => handleChange(e.target.checked)}
                  onBlur={handleBlur}
                  checked={state.value}
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export type PlaceDetailEditProps = {
  table: TableRecord
} & HTMLAttributes<HTMLDivElement>

export default PlaceDetailEdit
