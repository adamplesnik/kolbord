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
      'from-pink-500 to-pink-700 bg-gradient-to-br px-4 py-2 text-white hover:from-pink-600 transition-color',
    secondary: 'p-2 hover:bg-zinc-200/50 hover:border-zinc-200/50',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex w-fit cursor-pointer items-center gap-1 rounded border-transparent' +
        addWithSpace(
          active ? 'font-bold text-pink-500 hover:bg-pink-100 hover:text-pink-600' : ''
        ) +
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
