import { HTMLAttributes } from 'react'

const Em = ({ children }: EmProps) => {
  return (
    <span className="rounded border-b border-b-pink-300/20 bg-pink-100 px-0.5">{children}</span>
  )
}

type EmProps = {} & HTMLAttributes<HTMLSpanElement>

export default Em
