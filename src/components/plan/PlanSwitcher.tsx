import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'
import Button from '../basic/Button'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Ping from '../basic/Ping'

const PlanSwitcher = ({ companyId, onPlanChange, currentPlan, editMode }: PlanSwitcherProps) => {
  type PlansQueryType = {
    data: PlanRecord[]
  }

  const loadPlans = async (apiCompanyId: string): Promise<PlansQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/plans?fields[0]=id&fields[1]=uuid&fields[2]=name&filters[company][uuid][$eq]=${apiCompanyId}`,
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

  useEffect(() => {
    if (currentPlan === 0 && plans && plans.data.length > 0) {
      const latestPlanId = Number(localStorage.getItem(LATEST_PLAN_ID))
      const validPlans = plans.data.map((p) => p.id)
      const isValidPlanId = validPlans.includes(latestPlanId)
      const defaultPlanId = isValidPlanId ? latestPlanId : plans.data[0].id
      onPlanChange(defaultPlanId)
    }
  }, [plans, currentPlan])

  return (
    <>
      <div data-tooltip-id="plansTooltip">
        <Button IconRight={ChevronsUpDown}>
          {plans && plans.data.length === 0 && editMode && (
            <div className="flex items-center gap-2 text-pink-600">
              Create new plan
              <Ping className="-mr-[1.6rem]" />
            </div>
          )}
          {plans &&
            plans.data &&
            plans.data.map((plan) =>
              currentPlan === plan.id ? (
                <span key={plan.attributes.uuid}>{plan.attributes.name}</span>
              ) : (
                ''
              )
            )}
        </Button>
      </div>
      <Tooltip id="plansTooltip" openOnClick clickable>
        <div className="flex flex-col gap-1">
          {plans &&
            plans.data &&
            plans.data.map((plan) => (
              <Button
                className="w-full justify-center"
                key={`plan_${plan.id}`}
                onClick={() => onPlanChange(plan.id)}
                active={currentPlan === plan.id}
                Icon={Check}
                iconClassName={currentPlan === plan.id ? 'opacity-100' : 'opacity-35'}
              >
                {plan.attributes.name}
              </Button>
            ))}
          {editMode && <Button Icon={Plus}>Create new plan...</Button>}
        </div>
      </Tooltip>
    </>
  )
}

type PlanSwitcherProps = {
  companyId: string
  onPlanChange: (id: number) => void
  currentPlan: number
  editMode: boolean
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
