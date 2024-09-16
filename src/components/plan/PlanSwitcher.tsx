import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Button from '../basic/Button'
import EditButton from '../basic/EditButton'
import Ping from '../basic/Ping'
import GroupAdd from '../group/GroupAdd.tsx'
import GroupList from '../group/GroupList.tsx'
import SpaceAdd from '../space/SpaceAdd.tsx'
import { addPlan, usePlansQuery } from './planFetch.ts'
import Heading from '../basic/Heading.tsx'

const PlanSwitcher = ({
  companyId,
  currentPlan,
  handleGroupAdd,
  handlePlaceAdd,
  onGroupEdit,
  onPlanChange,
  onPlanEdit,
}: PlanSwitcherProps) => {
  const { userCanEdit } = useAuthContext()

  const { data: plans } = usePlansQuery(companyId)

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addPlan(companyId),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
      onPlanEdit(result?.data.id)
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
              currentPlan === plan.id ?
                <span key={`plan_in_switcher_${plan.id}`}>{plan.attributes.name}</span>
              : ''
            )}
        </Button>
      </div>
      <Tooltip id="plansTooltip" openOnClick clickable>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Heading size={4}>Plans</Heading>
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
                  <EditButton onClick={() => onPlanEdit(plan.id)} editMode={false} />
                </div>
              ))}
            {userCanEdit && (
              <Button Icon={Plus} onClick={() => mutate()} className="w-full">
                New plan
              </Button>
            )}
            {currentPlan > 0 && <SpaceAdd planId={currentPlan} handlePlaceAdd={handlePlaceAdd} />}
          </div>
          {userCanEdit && (
            <div className="flex flex-col gap-2">
              <Heading size={4}>Groups</Heading>
              <GroupList planId={currentPlan} onGroupEdit={onGroupEdit} />
              {currentPlan > 0 && <GroupAdd planId={currentPlan} handleGroupAdd={handleGroupAdd} />}
            </div>
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
  onGroupEdit: (groupId: number) => void
  onPlanEdit: (planId: number | undefined) => void
  handlePlaceAdd: (id: number) => void
  handleGroupAdd: () => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
