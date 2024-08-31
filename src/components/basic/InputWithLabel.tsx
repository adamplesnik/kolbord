import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import { Eye, EyeOff } from 'lucide-react'
import Button from './Button'

const InputWithLabel = ({
  label,
  value,
  required,
  inputType,
  onChange,
  onBlur,
  loose = false,
  placeholder,
  hasError = false,
}: InputWithLabelProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label className={'flex flex-col' + addWithSpace(loose ? 'gap-1' : 'gap-1')}>
      {label && (
        <span
          className={
            'shrink-0' +
            addWithSpace(loose ? 'text-sm' : 'text-xs') +
            addWithSpace(required ? 'font-bold' : 'font-normal')
          }
        >
          <>{label}</>
        </span>
      )}
      <span className="flex items-center gap-2">
        <input
          required={required}
          className={
            'w-full rounded' +
            addWithSpace(loose ? 'py-1.5 px-3' : 'py-1 px-2 text-sm') +
            addWithSpace(
              hasError
                ? 'border-red-600 bg-red-50'
                : 'border-slate-400 bg-slate-50 hover:border-slate-600'
            )
          }
          type={showPassword ? 'text' : inputType}
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
        />
        {inputType === 'password' && (
          <Button
            onClick={() => setShowPassword(!showPassword)}
            Icon={showPassword ? EyeOff : Eye}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          />
        )}
      </span>
    </label>
  )
}

type InputWithLabelProps = {
  label?: string | number
  value: string | number
  required: boolean
  inputType: 'text' | 'number' | 'password' | 'email'
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
  onBlur: FocusEventHandler<HTMLInputElement> | undefined
  loose?: boolean
  placeholder?: string | undefined
  hasError?: boolean | undefined
}

export default InputWithLabel
