import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

const CheckboxWithLabel = ({
  label,
  checked,
  required = false,
  onChange,
  onBlur,
}: CheckboxWithLabelProps) => {
  return (
    <label className="flex items-center gap-2">
      <span className={'order-last shrink-0 text-sm font-medium'}>{label}</span>
      <input
        required={required}
        type="checkbox"
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
      />
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
