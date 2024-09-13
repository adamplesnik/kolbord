import { addWithSpace } from '../../utils/addWithSpace'

const initials = (name: string | undefined) => {
  if (name) {
    const names = name.split(' ')
    return names.map((n) => Array.from(n)[0])
  }
}

const SpaceDot = ({
  bookedByMe,
  bookedByWho,
  bookedToday,
  small = false,
  className,
}: SpaceDotProps) => {
  return (
    <div
      className={
        'relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full font-bold' +
        addWithSpace(small ? 'size-4' : 'size-16 text-xl') +
        addWithSpace(
          !bookedToday && ' bg-teal-400/80 group-hover:bg-teal-600/80 group-active:bg-teal-500'
        ) +
        addWithSpace(
          bookedToday &&
            !bookedByMe &&
            'bg-pink-200 text-pink-700 opacity-70 group-hover:bg-pink-300 group-hover:opacity-90'
        ) +
        addWithSpace(
          bookedByMe && ' bg-slate-700/80 text-white hover:bg-slate-600 active:bg-slate-900'
        ) +
        addWithSpace(className)
      }
    >
      {bookedToday && (
        <span className="absolute top-0 right-0 z-10 size-full bg-gradient-to-tl from-pink-300 to-pink-200/40 to-60%"></span>
      )}
      {/*
      <div className="absolute top-0 left-0 z-20 size-full translate-x-0 bg-gradient-to-l from-slate-500 to-slate-500 transition-all duration-500 group-hover:translate-x-10"></div>
      {!bookedToday && (
        <span className="absolute bottom-0 z-10 size-full bg-gradient-to-tl from-lime-700 to-emerald-700"></span>
      )} */}

      {!small && <span className="z-40">{initials(bookedByWho)}</span>}
    </div>
  )
}

type SpaceDotProps = {
  bookedToday?: boolean | undefined
  bookedByWho?: string | undefined
  bookedByMe?: boolean | undefined
  className?: string | undefined
  small?: boolean
}

export default SpaceDot
