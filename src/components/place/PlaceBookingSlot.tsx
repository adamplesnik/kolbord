import { ArrowRight } from 'lucide-react'

const PlaceBookingSlot = ({ dateFrom, dateTo }: PlaceBookingSlotProps) => {
  const humanDate = (date: Date) => {
    return date.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
  }

  const isWholeDay = dateFrom.getHours() === 0 && dateTo.getHours() === 23

  return (
    <div className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-slate-400 px-1 text-sm hover:border-slate-900 hover:bg-slate-800 hover:text-white">
      {isWholeDay ? (
        'Whole day'
      ) : (
        <>
          {humanDate(dateFrom)}
          <ArrowRight className="size-4 text-slate-400" />
          {humanDate(dateTo)}
        </>
      )}
    </div>
  )
}

type PlaceBookingSlotProps = {
  dateFrom: Date
  dateTo: Date
}

export default PlaceBookingSlot
