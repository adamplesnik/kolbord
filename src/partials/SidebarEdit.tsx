import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { HTMLAttributes, useEffect } from 'react'
import { TableRecord } from '../data/TableRecord'
import SidebarEditRow from './SidebarEditRow'
import SidebarCheckboxRow from './SidebarCheckboxRow'

const SidebarEdit = ({ table }: SidebarEditProps) => {
  const updateTable = async (id: number, data: TableRecord): Promise<TableRecord> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tables/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_FULL_ACCESS}`,
      },
      body: JSON.stringify(data),
    })
    console.log(JSON.stringify(data))
    return response.json()
  }

  const { Field, handleSubmit, state, reset } = useForm<TableRecord>({
    onSubmit: () => changeOne,
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
        group: {
          data: {
            id: 0,
            attributes: {
              name: '',
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

  const queryClient = useQueryClient()

  const changeOne = (data: TableRecord) => {
    console.log(queryClient.getQueryData(['table', table.id]))
    console.log(data.attributes)
    updateTable(table.id, data)
    // queryClient.setQueryData(['tables'], data.attributes.uuid, data)
  }

  return (
    <form>
      <div className="flex flex-col gap-2">
        <Field
          name="attributes.name"
          children={({ state }) => (
            <SidebarEditRow label="Name" value={state.value} required inputType="text" />
          )}
        />
        <div className="flex gap-2">
          <Field
            name="attributes.x"
            children={({ state }) => (
              <SidebarEditRow label="X" value={state.value} required inputType="number" />
            )}
          />
          <Field
            name="attributes.y"
            children={({ state }) => (
              <SidebarEditRow label="Y" value={state.value} required inputType="number" />
            )}
          />
        </div>
        <div className="flex gap-2">
          <Field
            name="attributes.width"
            children={({ state }) => (
              <SidebarEditRow label="Width" value={state.value} required inputType="number" />
            )}
          />
          <Field
            name="attributes.height"
            children={({ state }) => (
              <SidebarEditRow label="Height" value={state.value} required inputType="number" />
            )}
          />
        </div>
        <Field
          name="attributes.rotation"
          children={({ state }) => (
            <SidebarEditRow label="Rotation" value={state.value} required inputType="text" />
          )}
        />
        <div className="flex gap-4 *:flex-1">
          <Field
            name="attributes.available"
            children={({ state }) => (
              <SidebarCheckboxRow label="Available" checked={state.value} required />
            )}
          />
          <Field
            name="attributes.rounded"
            children={({ state }) => (
              <SidebarCheckboxRow label="Rounded" checked={state.value} required />
            )}
          />
        </div>
      </div>
      <input type="submit" value={'sub'} />
    </form>
  )
}

export type SidebarEditProps = {
  table: TableRecord
} & HTMLAttributes<HTMLDivElement>

export default SidebarEdit
