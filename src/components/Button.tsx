import { HTMLAttributes } from 'react'
import { addWithSpace } from '../utils/addWithSpace'
import { Check } from 'lucide-react'

const Button = ({
  children,
  onClick,
  className,
  buttonType = 'secondary',
  active = false,
}: ButtonProps) => {
  const styling: Record<string, string> = {
    primary: 'bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 active:bg-zinc-900',
    secondary: 'p-2 hover:bg-zinc-200',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex w-fit cursor-pointer gap-1 rounded' +
        addWithSpace(active ? 'font-bold' : '') +
        addWithSpace(styling[buttonType]) +
        addWithSpace(className)
      }
    >
      {active && <Check />}
      {children}
    </button>
  )
}

export type ButtonProps = {
  buttonType?: 'primary' | 'secondary'
  active?: boolean | undefined
} & HTMLAttributes<HTMLButtonElement>

export default Button
