import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCheck, CloudOff, CloudUpload } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { getToken } from '../auth/helpers'
import { TableRecord } from '../data/TableRecord'
import { addWithSpace } from '../utils/addWithSpace'
import { LATEST_PLACE_METADATA } from '../utils/constants'
import SpaceDetailCheckboxRow from './SpaceDetailCheckboxRow'
import SpaceDetailEditRow from './SpaceDetailEditRow'

const SpaceDetailEdit = ({ table }: SpaceDetailEditProps) => {
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
        type: table?.attributes.type,
        group: {
          data: {
            id: 0,
            attributes: {
              name: '',
              description: '',
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
            'absolute top-0 right-0 size-4 text-zinc-500 transition-opacity' +
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
            <SpaceDetailEditRow
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
              <SpaceDetailEditRow
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
              <SpaceDetailEditRow
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
        <div className="flex gap-2">
          <Field
            name="attributes.width"
            children={({ state, handleChange, handleBlur }) => (
              <SpaceDetailEditRow
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
              <SpaceDetailEditRow
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
              <SpaceDetailEditRow
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
              <SpaceDetailCheckboxRow
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
              <SpaceDetailCheckboxRow
                label="Rounded"
                onChange={(e) => handleChange(e.target.checked)}
                onBlur={handleBlur}
                checked={state.value}
              />
            )}
          />
        </div>
      </div>
      <input type="submit" value={'sub'} />
    </form>
  )
}

export type SpaceDetailEditProps = {
  table: TableRecord
} & HTMLAttributes<HTMLDivElement>

export default SpaceDetailEdit
