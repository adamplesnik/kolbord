import { HTMLAttributes } from 'react'
import { addWithSpace } from '../utils/addWithSpace'

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex w-fit cursor-pointer rounded p-2 hover:bg-zinc-200' + addWithSpace(className)
      }
    >
      {children}
    </button>
  )
}

export type ButtonProps = {} & HTMLAttributes<HTMLButtonElement>

export default Button
