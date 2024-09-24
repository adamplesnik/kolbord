import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Check, ChevronsUpDown, Plus, User } from 'lucide-react'
import { HTMLAttributes, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { PlanRecord } from '../../data/PlanRecord.tsx'
import { LATEST_PLAN_ID } from '../../utils/constants.ts'
import Button from '../basic/Button'
import EditButton from '../basic/EditButton'
import Heading from '../basic/Heading.tsx'
import Ping from '../basic/Ping'
import GroupAdd from '../group/GroupAdd.tsx'
import GroupList from '../group/GroupList.tsx'
import SpaceAdd from '../space/SpaceAdd.tsx'
import { addPlan } from './planFetch.ts'

const PlanSwitcher = ({
  companyId,
  currentPlan,
  handleGroupAdd,
  handlePlaceAdd,
  handleMyBookings,
  onGroupEdit,
  onPlanChange,
  onPlanEdit,
}: PlanSwitcherProps) => {
  const userCanEdit = true

  const { getToken } = useAuth()

  const loadPlans = async (): Promise<{ data: { docs: PlanRecord[] } }> => {
    const token = await getToken()
    return axios.get(`${import.meta.env.VITE_API_PAYLOAD_URL}/zones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const { data: zones } = useQuery({
    queryKey: ['zones'],
    queryFn: () => loadPlans(),
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addPlan(companyId),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      onPlanEdit(result?.id)
    },
  })

  useEffect(() => {
    if (currentPlan === 0 && zones && zones.data.docs.length > 0) {
      const latestPlanId = Number(localStorage.getItem(LATEST_PLAN_ID))
      const defaultPlanId = latestPlanId ? latestPlanId : zones.data.docs[0].id
      onPlanChange(defaultPlanId)
    }
  }, [zones, currentPlan, onPlanChange])

  return (
    <>
      <div data-tooltip-id="plansTooltip">
        <Button IconRight={ChevronsUpDown}>
          {zones && zones.data.docs.length === 0 && (
            <div className="flex items-center gap-2 text-pink-600">
              Create new plan
              <Ping className="-mr-[1.6rem]" />
            </div>
          )}
          {zones &&
            zones.data &&
            zones.data.docs.map((plan) =>
              currentPlan === plan.id ?
                <span key={`plan_in_switcher_${plan.id}`}>{plan.name}</span>
              : ''
            )}
        </Button>
      </div>
      <Tooltip id="plansTooltip" openOnClick clickable>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Heading size={4}>Zones</Heading>
            {zones &&
              zones.data &&
              zones.data.docs.map((zone) => (
                <div className="flex gap-1" key={`plan_${zone.id}`}>
                  <Button
                    className="flex-1"
                    onClick={() => onPlanChange(zone.id)}
                    active={currentPlan === zone.id}
                    Icon={Check}
                    iconClassName={currentPlan === zone.id ? 'opacity-100' : 'opacity-35'}
                  >
                    {zone.name}
                  </Button>
                  <EditButton onClick={() => onPlanEdit(zone.id)} editMode={false} />
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
        <Button onClick={handleMyBookings} className="w-full" Icon={User}>
          Your bookings
        </Button>
      </Tooltip>
    </>
  )
}

type PlanSwitcherProps = {
  companyId: number
  currentPlan: number
  handleGroupAdd: () => void
  handleMyBookings: () => void
  handlePlaceAdd: (id: number) => void
  onGroupEdit: (groupId: number) => void
  onPlanChange: (id: number | undefined) => void
  onPlanEdit: (planId: number | undefined) => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
