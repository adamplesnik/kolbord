import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Plus, User } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Button from '../basic/Button'
import EditButton from '../basic/EditButton'
import Ping from '../basic/Ping'
import SpaceAdd from '../space/SpaceAdd.tsx'

const PlanSwitcher = ({
  bookings,
  companyId,
  currentPlan,
  handleMyBookings,
  handlePlaceAdd,
  onPlanChange,
  onPlanEdit,
}: PlanSwitcherProps) => {
  const { userCanEdit } = useAuthContext()

  type NewPlanType = {
    data: PlanRecord
  }
  const addPlan = async (apiCompanyId: number): Promise<NewPlanType | undefined> => {
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
    if (response.ok) {
      return response.json()
    }
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
          {bookings && 'My bookings'}
          {plans &&
            plans.data &&
            !bookings &&
            plans.data.map((plan) =>
              currentPlan === plan.id ?
                <span key={`plan_in_switcher_${plan.id}`}>{plan.attributes.name}</span>
              : ''
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
                <EditButton onClick={() => onPlanEdit(plan.id)} editMode={false} />
              </div>
            ))}
          <Button
            onClick={handleMyBookings}
            className="w-full"
            active={bookings}
            Icon={User}
            iconClassName={bookings ? 'opacity-85' : 'opacity-35'}
          >
            My bookings
          </Button>

          {userCanEdit && (
            <>
              {plans && plans.data.length > 0 && (
                <div className="my-2 h-px w-full bg-slate-200"></div>
              )}
              <Button Icon={Plus} onClick={() => mutate()} className="w-full">
                New plan
              </Button>
              {currentPlan > 0 && <SpaceAdd planId={currentPlan} handlePlaceAdd={handlePlaceAdd} />}
            </>
          )}
        </div>
      </Tooltip>
    </>
  )
}

type PlanSwitcherProps = {
  companyId: number
  bookings: boolean
  onPlanChange: (id: number | undefined) => void
  currentPlan: number
  onPlanEdit: (planId: number | undefined) => void
  handlePlaceAdd: (id: number) => void
  handleMyBookings: () => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
