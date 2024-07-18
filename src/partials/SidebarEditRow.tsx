import { Path, UseFormRegister } from 'react-hook-form'
import { TableRecord } from '../data/TableRecord'

const SidebarEditRow = ({ label, register, required, inputType }: SidebarEditRowProps) => {
  return (
    <label className="flex flex-col gap-1">
      <span className={'w-12 shrink-0 text-xs ' + (required ? 'font-bold' : 'font-normal')}>
        {label}
      </span>
      <input
        {...register(label, { required })}
        className="w-full rounded border-slate-400 px-1.5 text-sm"
        type={inputType}
      />
    </label>
  )
}

type SidebarEditRowProps = {
  label: Path<TableRecord>
  register: UseFormRegister<TableRecord>
  required: boolean
  inputType: 'text' | 'number'
}

export default SidebarEditRow
