import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import { LucideIcon } from 'lucide-react'

const Button = ({
  children,
  onClick,
  asBlock = false,
  disabled,
  className,
  buttonType = 'secondary',
  active = false,
  Icon = undefined,
  IconRight = undefined,
  iconClassName = undefined,
  type = 'button',
  ...props
}: ButtonProps) => {
  const styling: Record<string, string> = {
    primary:
      'bg-slate-800 px-4 py-2 text-white transition-color hover:bg-slate-700 active:bg-slate-950',
    secondary: 'p-2 hover:bg-slate-300/50 active:bg-slate-300',
    tertiary: 'text-cyan-600 hover:text-cyan-800',
  }

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={
        'items-center gap-2 rounded transition-colors' +
        addWithSpace(
          disabled ? 'pointer-events-none cursor-not-allowed opacity-40' : 'cursor-pointer'
        ) +
        addWithSpace(active ? 'font-bold' : '') +
        addWithSpace(styling[buttonType]) +
        addWithSpace(className) +
        addWithSpace(asBlock ? 'flex justify-center' : 'inline-flex w-fit')
      }
      {...props}
    >
      {Icon && (
        <Icon
          strokeWidth={2}
          className={'size-5' + addWithSpace(iconClassName)}
          aria-hidden={true}
        />
      )}
      {children}
      {IconRight && (
        <IconRight className={'size-5' + addWithSpace(iconClassName)} aria-hidden={true} />
      )}
    </button>
  )
}

export type ButtonProps = {
  active?: boolean | undefined
  asBlock?: boolean | undefined
  buttonType?: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit'
  Icon?: LucideIcon | undefined
  IconRight?: LucideIcon | undefined
  iconClassName?: string | undefined
  disabled?: boolean | undefined
} & HTMLAttributes<HTMLButtonElement>

export default Button
