import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

const CheckboxWithLabel = ({
  label,
  checked,
  required = false,
  onChange,
  onBlur,
}: CheckboxWithLabelProps) => {
  return (
    <label className="flex items-baseline gap-2">
      <input
        required={required}
        type="checkbox"
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
      />
      <span className={'text-wrap text-sm font-medium'}>{label}</span>
    </label>
  )
}

type CheckboxWithLabelProps = {
  label: string | number | ReactNode
  checked: boolean | undefined
  required?: boolean | undefined
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
  onBlur: FocusEventHandler<HTMLInputElement> | undefined
}

export default CheckboxWithLabel
