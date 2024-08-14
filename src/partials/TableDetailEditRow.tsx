import { HTMLAttributes } from 'react'

const TableDetailEditRow = ({
  label,
  value,
  required,
  inputType,
  onChange,
  onBlur,
}: TableDetailEditRowProps) => {
  return (
    <label className="flex flex-col gap-1">
      <span className={'w-12 shrink-0 text-xs ' + (required ? 'font-bold' : 'font-normal')}>
        <>{label}</>
      </span>
      <input
        required={required}
        className="w-full rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
        type={inputType}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </label>
  )
}

type TableDetailEditRowProps = {
  label: string | number
  value: string | number
  required: boolean
  inputType: 'text' | 'number'
} & HTMLAttributes<HTMLInputElement>

export default TableDetailEditRow
