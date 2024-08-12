import { HTMLAttributes } from 'react'

const SidebarEditRow = ({
  label,
  value,
  required,
  inputType,
  onChange,
  onBlur,
}: SidebarEditRowProps) => {
  return (
    <label className="flex flex-col gap-1">
      <span className={'w-12 shrink-0 text-xs ' + (required ? 'font-bold' : 'font-normal')}>
        <>{label}</>
      </span>
      <input
        required={required}
        className="w-full rounded border-slate-400 px-1.5 text-sm"
        type={inputType}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </label>
  )
}

type SidebarEditRowProps = {
  label: string | number
  value: string | number
  required: boolean
  inputType: 'text' | 'number'
} & HTMLAttributes<HTMLInputElement>

export default SidebarEditRow
