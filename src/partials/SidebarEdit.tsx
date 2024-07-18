import { HTMLAttributes, useEffect, useState } from 'react'
import { TableRecord } from '../data/TableRecord'
import SidebarEditRow from './SidebarEditRow'
import { SubmitHandler, useForm } from 'react-hook-form'

const SidebarEdit = ({ table }: SidebarEditProps) => {
  const [isAvailable, setIsAvailable] = useState(table.attributes.available)

  useEffect(() => {
    reset(table)
  }, [table])

  const { register, handleSubmit, reset } = useForm<TableRecord>({
    defaultValues: {
      attributes: {
        name: table.attributes.name,
        x: table.attributes.x,
        y: table.attributes.y,
      },
    },
  })
  const onSubmit: SubmitHandler<TableRecord> = (data) => console.log(data)

  return (
    <form onChange={handleSubmit(onSubmit)}>
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => setIsAvailable(!isAvailable)}
            checked={isAvailable}
          />
          Available
        </label>
      </div>
    </form>
  )
}

export type SidebarEditProps = {
  table: TableRecord
} & HTMLAttributes<HTMLDivElement>

export default SidebarEdit
