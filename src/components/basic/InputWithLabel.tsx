import clsx from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import Button from './Button'

const InputWithLabel = ({
  label,
  value,
  required,
  inputType,
  onChange,
  onBlur,
  placeholder,
  hasError = false,
}: InputWithLabelProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label className="flex flex-col gap-1">
      {label && (
        <span className={clsx('shrink-0 text-sm', required ? 'font-bold' : 'font-normal')}>
          <>{label}</>
        </span>
      )}
      <span className="flex items-center gap-2">
        <input
          required={required}
          className={clsx(
            'w-full rounded py-1 px-2 text-sm',
            hasError ?
              'border-red-600 bg-red-50'
            : 'border-slate-400 bg-slate-50 hover:border-slate-600'
          )}
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
  placeholder?: string | undefined
  hasError?: boolean | undefined
}

export default InputWithLabel
