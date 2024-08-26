import { ChangeEventHandler, FocusEventHandler } from 'react'

const PlaceDetailEditRow = ({
  label,
  value,
  required,
  inputType,
  onChange,
  onBlur,
}: PlaceDetailEditRowProps) => {
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

type PlaceDetailEditRowProps = {
  label: string | number
  value: string | number
  required: boolean
  inputType: 'text' | 'number'
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
  onBlur: FocusEventHandler<HTMLInputElement> | undefined
}

export default PlaceDetailEditRow
