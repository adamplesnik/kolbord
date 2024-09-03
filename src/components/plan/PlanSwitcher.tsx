import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Button from '../basic/Button'
import EditButton from '../basic/EditButton'
import Ping from '../basic/Ping'

const PlanSwitcher = ({ companyId, onPlanChange, currentPlan, onPlanEdit }: PlanSwitcherProps) => {
  const { user } = useAuthContext()
  const userCanEdit = user?.role && user?.role.id === 3

  type NewPlanType = {
    data: PlanRecord
  }
  const addPlan = async (apiCompanyId: number): Promise<NewPlanType> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { name: 'New plan', svg: '<svg></svg>', company: apiCompanyId },
      }),
    })
    return response.json()
  }

  type PlansQueryType = {
    data: PlanRecord[]
  }

  const loadPlans = async (apiCompanyId: number): Promise<PlansQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/plans?fields[0]=id&fields[1]=name&filters[company][id][$eq]=${apiCompanyId}`,
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

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addPlan(companyId),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
      onPlanEdit(result.data.id)
    },
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
          {plans && plans.data.length === 0 && (
            <div className="flex items-center gap-2 text-pink-600">
              Create new plan
              <Ping className="-mr-[1.6rem]" />
            </div>
          )}
          {plans &&
            plans.data &&
            plans.data.map((plan) =>
              currentPlan === plan.id ? (
                <span key={`plan_in_switcher_${plan.id}`}>{plan.attributes.name}</span>
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
              <div className="flex gap-1" key={`plan_${plan.id}`}>
                <Button
                  className="flex-1"
                  onClick={() => onPlanChange(plan.id)}
                  active={currentPlan === plan.id}
                  Icon={Check}
                  iconClassName={currentPlan === plan.id ? 'opacity-100' : 'opacity-35'}
                >
                  {plan.attributes.name}
                </Button>
                {userCanEdit && <EditButton onClick={() => onPlanEdit(plan.id)} />}
              </div>
            ))}

          {userCanEdit && (
            <Button Icon={Plus} onClick={() => mutate()} className="flex-1">
              Create new plan...
            </Button>
          )}
        </div>
      </Tooltip>
    </>
  )
}

type PlanSwitcherProps = {
  companyId: number
  onPlanChange: (id: number | undefined) => void
  currentPlan: number
  onPlanEdit: (planId: number | undefined) => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
