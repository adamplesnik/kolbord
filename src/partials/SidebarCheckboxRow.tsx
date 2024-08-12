const SidebarCheckboxRow = ({ label, checked, required }: SidebarCheckboxRowProps) => {
  return (
    <label className="flex flex-col gap-1">
      <span className={'w-12 shrink-0 text-xs ' + (required ? 'font-bold' : 'font-normal')}>
        <>{label}</>
      </span>
      <input
        required={required}
        className="w-full rounded border-slate-400 px-1.5 text-sm"
        type="checkbox"
        defaultChecked={checked}
      />
    </label>
  )
}

type SidebarCheckboxRowProps = {
  label: string | number
  checked: boolean | undefined
  required: boolean
}

export default SidebarCheckboxRow
