import clsx from 'clsx'
import UserName from '../user/UserName'

const SpaceDot = ({ bookedByMe, bookedByWho, bookedToday, small = false }: SpaceDotProps) => {
  return (
    <div
      className={clsx(
        'group flex shrink-0 cursor-pointer items-center justify-center rounded-full font-medium',
        small ? 'size-4 border-1' : 'size-8 border-2 text-xs',
        !bookedToday &&
          'border-slate-500 bg-teal-400/80 group-hover:border-teal-600 active:bg-teal-500',
        bookedToday && !bookedByMe && 'border-rose-400 bg-rose-300 opacity-80',
        bookedByMe &&
          'border-slate-800 bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-900'
      )}
    >
      {!small && <UserName subject={bookedByWho} initials />}
    </div>
  )
}

type SpaceDotProps = {
  bookedToday?: boolean | undefined
  bookedByWho?: string | undefined | null
  bookedByMe?: boolean | undefined
  small?: boolean
}

export default SpaceDot
