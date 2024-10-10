import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'

const Button = ({
  children,
  onClick,
  asBlock = false,
  disabled,
  className,
  buttonType = 'secondary',
  active = false,
  Icon = undefined,
  iconClassName = undefined,
  type = 'button',
  ...props
}: ButtonProps) => {
  const styling: Record<string, string> = {
    primary: 'bg-gray-800 text-white transition-color hover:bg-zinc-700 active:bg-gray-950',
    secondary: 'hover:bg-gray-200/60 active:bg-gray-300',
    menu: 'hover:bg-gray-300 active:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-800',
  }

  return (
    <button
      data-testid="button"
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        'h-8 items-center gap-2 rounded p-2 transition-colors',
        disabled ? 'pointer-events-none cursor-not-allowed opacity-40' : 'cursor-pointer',
        active ? 'font-bold' : '',
        styling[buttonType],
        className,
        asBlock ? 'flex justify-center' : 'inline-flex w-fit'
      )}
      {...props}
    >
      {Icon && (
        <Icon strokeWidth={1.5} className={clsx('size-5', iconClassName)} aria-hidden={true} />
      )}
      {children}
    </button>
  )
}

export type ButtonProps = {
  active?: boolean | undefined
  asBlock?: boolean | undefined
  buttonType?: 'primary' | 'secondary' | 'danger' | 'menu'
  disabled?: boolean | undefined
  Icon?: LucideIcon | undefined
  iconClassName?: string | undefined
  type?: 'button' | 'submit'
} & HTMLAttributes<HTMLButtonElement>

export default Button
