import { addWithSpace } from '../../utils/addWithSpace'

const initials = (name: string | undefined) => {
  if (name) {
    const names = name.split(' ')
    return names.map((n) => Array.from(n)[0])
  }
}

const SpaceDot = ({ bookedByMe, bookedByWho, bookedToday, small = false }: SpaceDotProps) => {
  return (
    <div
      className={
        'group flex shrink-0 cursor-pointer items-center justify-center rounded-full font-bold' +
        addWithSpace(small ? 'size-4 border-1' : 'size-16 border-2 text-2xl') +
        addWithSpace(
          !bookedToday &&
            'border-slate-500 bg-teal-400/80 group-hover:border-teal-600 active:bg-teal-500'
        ) +
        addWithSpace(bookedToday && !bookedByMe && 'border-rose-400 bg-rose-300 opacity-80') +
        addWithSpace(
          bookedByMe &&
            'border-slate-800 bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-900'
        )
      }
    >
      {!small && initials(bookedByWho)}
    </div>
  )
}

type SpaceDotProps = {
  bookedToday?: boolean | undefined
  bookedByWho?: string | undefined
  bookedByMe?: boolean | undefined
  small?: boolean
}

export default SpaceDot
