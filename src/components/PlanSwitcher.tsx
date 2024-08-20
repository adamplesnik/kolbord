import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'
import { getToken } from '../auth/helpers'
import { PlanRecord } from '../data/PlanRecord'
import Button from './Button'

const PlanSwitcher = ({ companyId, onPlanChange }: PlanSwitcherProps) => {
  type PlansQueryType = {
    data: PlanRecord[]
  }

  const loadPlans = async (apiCompanyId: string): Promise<PlansQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/plans?populate[fields][0]=id&fields[1]=name&filter=[company][uuid][$eq]=${apiCompanyId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => loadPlans(companyId),
  })

  return (
    <div className="flex">
      {plans &&
        plans.data.map((plan) => (
          <Button key={`plan_${plan.id}`} onClick={() => onPlanChange(plan.id)}>
            {plan.attributes.name}
          </Button>
        ))}
    </div>
  )
}

type PlanSwitcherProps = {
  companyId: string
  onPlanChange: (id: number) => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
