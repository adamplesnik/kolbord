import { useContext } from 'react'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider'
import Loading from '../basic/Loading'

const ZonePlan = () => {
  const { zone, isLoading } = useContext(ZoneContext) as ZoneContextType

  return (
    <>
      {isLoading && <Loading />}
      {zone && zone.svg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(zone.svg)}`}
          className="max-w-fit"
        />
      )}
    </>
  )
}

export default ZonePlan
