import { HTMLAttributes } from 'react'

const SidebarCheckboxRow = ({
  label,
  checked,
  required = false,
  onChange,
  onBlur,
}: SidebarCheckboxRowProps) => {
  return (
    <label className="flex flex-col gap-1">
      <span className={'w-12 shrink-0 text-xs ' + (required ? 'font-bold' : 'font-normal')}>
        <>{label}</>
      </span>
      <input
        required={required}
        className="w-full rounded border-slate-400 px-1.5 text-sm"
        type="checkbox"
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
      />
    </label>
  )
}

type SidebarCheckboxRowProps = {
  label: string | number
  checked: boolean | undefined
  required?: boolean | undefined
} & HTMLAttributes<HTMLInputElement>

export default SidebarCheckboxRow
