import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'
import Button from '../Button'

const PlanSwitcher = ({ companyId, onPlanChange, currentPlan }: PlanSwitcherProps) => {
  type PlansQueryType = {
    data: PlanRecord[]
  }

  const loadPlans = async (apiCompanyId: string): Promise<PlansQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/plans?fields[0]=uuid&fields[1]=name&filters[company][uuid][$eq]=${apiCompanyId}`,
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
    <>
      <div data-tooltip-id="plansTooltip">
        <Button>
          {plans &&
            plans.data.map((plan) =>
              currentPlan === plan.attributes.uuid ? <span>{plan.attributes.name}</span> : ''
            )}
          <ChevronsUpDown size={18} />
        </Button>
      </div>
      <Tooltip id="plansTooltip" openOnClick clickable>
        <div className="flex flex-col gap-1">
          {plans &&
            plans.data.map((plan) => (
              <Button
                className="w-full justify-center"
                key={`plan_${plan.id}`}
                onClick={() => onPlanChange(plan.attributes.uuid)}
                active={currentPlan === plan.attributes.uuid}
              >
                {plan.attributes.name}
              </Button>
            ))}
        </div>
      </Tooltip>
    </>
  )
}

type PlanSwitcherProps = {
  companyId: string
  onPlanChange: (uuid: string) => void
  currentPlan: string
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
