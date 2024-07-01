import { HTMLAttributes } from 'react'
import { addWithSpace } from '../utils/addWithSpace'

const Svg = ({ source, className }: SvgProps) => {
  return <img className={'' + addWithSpace(className)} src={source} />
}

export type SvgProps = {
  source: string
} & HTMLAttributes<HTMLImageElement>

export default Svg