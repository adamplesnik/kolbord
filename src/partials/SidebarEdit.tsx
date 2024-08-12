import { HTMLAttributes, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TableRecord } from '../data/TableRecord'
import SidebarEditRow from './SidebarEditRow'
import { useQueryClient } from '@tanstack/react-query'

const SidebarEdit = ({ table }: SidebarEditProps) => {
  const { register, handleSubmit, reset } = useForm<TableRecord>({
    defaultValues: {
      attributes: {
        name: table?.attributes.name,
        x: table?.attributes.x,
        y: table?.attributes.y,
        width: table?.attributes.width,
        height: table?.attributes.height,
        rotation: table?.attributes.rotation,
        available: table?.attributes.available,
        rounded: table?.attributes.rounded,
      },
    },
  })

  useEffect(() => {
    reset(table)
  }, [table])

  const queryClient = useQueryClient()

  const changeOne: SubmitHandler<TableRecord> = (data) => {
    console.log(data)
    console.log(queryClient.getQueryData(['tables']))
    // queryClient.setQueryData(['tables'], data.attributes.uuid, data)
  }

  return (
    <form onChange={handleSubmit(changeOne)}>
      <div className="flex flex-col gap-2">
        <SidebarEditRow label={'attributes.name'} register={register} required inputType="text" />
        <div className="flex gap-2">
          <SidebarEditRow label={'attributes.x'} register={register} required inputType="number" />
          <SidebarEditRow label={'attributes.y'} register={register} required inputType="number" />
        </div>
        <div className="flex gap-2">
          <SidebarEditRow
            label={'attributes.width'}
            register={register}
            required
            inputType="number"
          />
          <SidebarEditRow
            label={'attributes.height'}
            register={register}
            required
            inputType="number"
          />
        </div>
        <SidebarEditRow
          label={'attributes.rotation'}
          register={register}
          required
          inputType="text"
        />
        <div className="flex gap-4 *:flex-1">
          <SidebarEditRow
            inputType="checkbox"
            label={'attributes.available'}
            register={register}
            required
          />
          <SidebarEditRow
            inputType="checkbox"
            label={'attributes.rounded'}
            register={register}
            required
          />
        </div>
      </div>
    </form>
  )
}

export type SidebarEditProps = {
  table: TableRecord | undefined
} & HTMLAttributes<HTMLDivElement>

export default SidebarEdit
