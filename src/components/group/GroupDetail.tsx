import { useAuth } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { GroupRecord } from '../../data/GroupRecord'
import Button from '../basic/Button'
import CheckboxWithLabel from '../basic/CheckboxWithLabel'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import { useZone } from '../plan/useZone'
import { editGroup } from './groupFetch'

const GroupDetail = ({ groupId, sendTitle }: GroupDetailProps) => {
  const { getToken } = useAuth()
  const { zoneId } = useZone()
  const loadGroup = async (groupId: number): Promise<{ data: GroupRecord }> => {
    const response = await fetch(`${import.meta.env.VITE_API_PAYLOAD_URL}/zone-groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
    return response.json()
  }

  const { data: group } = useQuery({
    queryKey: ['group', groupId],
    enabled: groupId > 0,
    queryFn: () => loadGroup(groupId),
  })

  const { Field, handleSubmit, reset } = useForm<GroupRecord>({
    onSubmit: async ({ value }) => {
      mutate(value)
    },
    defaultValues: {
      id: group?.data.id ?? 0,
      name: group?.data.attributes.name ?? '',
      description: group?.data.attributes.description ?? '',
      x: group?.data.attributes.x ?? 0,
      y: group?.data.attributes.y ?? 0,
      showMarker: group?.data.attributes.showMarker ?? false,
    },
  })

  const queryClient = useQueryClient()
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: GroupRecord) => editGroup(groupId, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['group', groupId] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', zoneId],
      })
      queryClient.invalidateQueries({
        queryKey: ['group', groupId],
      })
    },
  })

  useEffect(() => {
    sendTitle(group?.data.attributes.name)
  }, [sendTitle, group?.data.attributes.name])

  useEffect(() => {
    reset()
  }, [groupId])

  return (
    <>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <FetchStatus isPending={isPending} isError={isError} isSuccess={isSuccess} />
        <Field
          name="attributes.name"
          children={({ state, handleChange, handleBlur }) => (
            <InputWithLabel
              label="Name"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              required
              inputType="text"
            />
          )}
        />
        <Field
          name="attributes.description"
          children={({ state, handleChange, handleBlur }) => (
            <div className="flex flex-col gap-1">
              <span className="block text-xs font-bold">Description</span>
              <textarea
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                required
                className="h-24 rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
                value={state.value}
              />
            </div>
          )}
        />
        <Field
          name="attributes.showMarker"
          children={({ state, handleChange, handleBlur }) => (
            <CheckboxWithLabel
              label="Show marker"
              checked={state.value}
              onChange={(e) => handleChange(e.target.checked)}
              onBlur={handleBlur}
            />
          )}
        />
        <div className="flex gap-4">
          <Field
            name="attributes.x"
            children={({ state, handleChange, handleBlur }) => (
              <InputWithLabel
                label="X"
                value={state.value}
                onChange={(e) => handleChange(+e.target.value)}
                onBlur={handleBlur}
                required
                inputType="number"
              />
            )}
          />
          <Field
            name="attributes.y"
            children={({ state, handleChange, handleBlur }) => (
              <InputWithLabel
                label="Y"
                value={state.value}
                onChange={(e) => handleChange(+e.target.value)}
                onBlur={handleBlur}
                required
                inputType="number"
              />
            )}
          />
        </div>
        <Button type="submit" buttonType="primary">
          Update group
        </Button>
      </form>
      {/* <PlanDelete
          zoneId={zoneId}
          planName={plan?.data.attributes.name}
          planCompanyUuid={plan?.data.attributes.company?.data.attributes.uuid}
          userCompanyUuid={user?.company.uuid}
          handleDelete={handleDelete}
        /> */}
    </>
  )
}

type GroupDetailProps = {
  editMode: boolean
  groupId: number
  sendTitle: (title: string | undefined) => void
}

export default GroupDetail
