import { HTMLAttributes } from 'react'
import { addWithSpace } from '../utils/addWithSpace'

const Button = ({
  children,
  onClick,
  className,
  buttonType = 'secondary',
  active = false,
}: ButtonProps) => {
  const styling: Record<string, string> = {
    primary:
      'bg-slate-800 px-4 py-2 text-white transition-color hover:bg-slate-950 active:bg-black',
    secondary: 'p-2 hover:bg-slate-200/50',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex w-fit cursor-pointer items-center gap-1 rounded' +
        addWithSpace(active ? 'font-bold' : '') +
        addWithSpace(styling[buttonType]) +
        addWithSpace(className)
      }
    >
      {children}
    </button>
  )
}

export type ButtonProps = {
  buttonType?: 'primary' | 'secondary'
  active?: boolean | undefined
} & HTMLAttributes<HTMLButtonElement>

export default Button
