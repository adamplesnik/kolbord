import { useState, useEffect } from 'react'
import { PlanRecord } from '../data/PlanRecord'

const Plan = ({ id = -1 }) => {
  const [all, setAll] = useState<PlanRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async (id: number) => {
      setIsLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/plans/${id}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
          },
        })
        const data = await response.json()
        setAll(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id > -1) {
      fetchData(id)
    }
  }, [])

  return (
    <>
      <span className={isLoading ? 'block' : 'hidden'}>Loading</span>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(all.attributes?.svg)}`}
        className="max-w-fit"
      />
    </>
  )
}

export default Plan
