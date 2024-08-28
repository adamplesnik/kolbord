import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import { LucideIcon } from 'lucide-react'

const Button = ({
  children,
  onClick,
  className,
  buttonType = 'secondary',
  active = false,
  Icon = undefined,
  IconRight = undefined,
  iconClassName = undefined,
}: ButtonProps) => {
  const styling: Record<string, string> = {
    primary:
      'bg-slate-800 px-4 py-2 text-white transition-color hover:bg-slate-950 active:bg-black',
    secondary: 'p-2 hover:bg-slate-300/50',
    tertiary: 'text-cyan-600 hover:text-cyan-800',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex w-fit cursor-pointer items-center gap-2 rounded' +
        addWithSpace(active ? 'font-bold' : '') +
        addWithSpace(styling[buttonType]) +
        addWithSpace(className)
      }
    >
      {Icon && <Icon strokeWidth={2} className={'size-5' + addWithSpace(iconClassName)} />}
      {children}
      {IconRight && <IconRight className={'size-5' + addWithSpace(iconClassName)} />}
    </button>
  )
}

export type ButtonProps = {
  buttonType?: 'primary' | 'secondary' | 'tertiary'
  active?: boolean | undefined
  Icon?: LucideIcon | undefined
  IconRight?: LucideIcon | undefined
  iconClassName?: string | undefined
} & HTMLAttributes<HTMLButtonElement>

export default Button
