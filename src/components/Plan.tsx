import { useState, useEffect } from 'react'
import { PlanRecord } from '../data/PlanRecord'
import Loading from './Loading'

const Plan = ({ id = -1 }) => {
  const [plan, setPlan] = useState<PlanRecord[]>()
  const [isLoading, setIsLoading] = useState(false)

  const fetchPlan = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_PRIVATE_READ_ONLY_API_ID}`,
        },
      })
      const data = await response.json()
      setPlan([data.data])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id > -1) {
      fetchPlan(id)
    }
  }, [id])

  return (
    <>
      <Loading loading={isLoading} />
      {plan?.map((m) => (
        <img
          key={`plan${m.id}`}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(m.attributes.svg)}`}
          className="max-w-fit"
        />
      ))}
    </>
  )
}

export default Plan
