import { useAuth } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { GroupRecord } from '../../data/GroupRecord'
import Button from '../basic/Button'
import CheckboxWithLabel from '../basic/CheckboxWithLabel'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import { useZone } from '../plan/useZone'

const GroupDetail = ({ group, sendTitle }: GroupDetailProps) => {
  const { zoneId } = useZone()
  const { getToken } = useAuth()

  const { Field, handleSubmit, reset } = useForm<GroupRecord>({
    onSubmit: async ({ value }) => {
      mutate(value)
    },
    defaultValues: {
      id: group?.id ?? 0,
      name: group?.name ?? '',
      description: group?.description ?? '',
      x: group?.x ?? 0,
      y: group?.y ?? 0,
      showMarker: group?.showMarker ?? false,
      zone: group.zone,
      org: group.org,
    },
  })

  const editGroup = async (groupId: number, data: GroupRecord) => {
    return await axios.patch(
      `${import.meta.env.VITE_API_URL}/zone-groups/${groupId}`,
      JSON.stringify({
        name: data.name,
        description: data.description,
        x: data.x,
        y: data.y,
        showMarker: data.showMarker,
      }),
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const queryClient = useQueryClient()
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: GroupRecord) => editGroup(group.id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['group', group.id] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', zoneId],
      })
      queryClient.invalidateQueries({
        queryKey: ['group', group.id],
      })
    },
  })

  useEffect(() => {
    sendTitle(group?.name)
  }, [sendTitle, group])

  useEffect(() => {
    reset()
  }, [reset, group])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <FetchStatus isPending={isPending} isError={isError} isSuccess={isSuccess} />
      <Field
        name="name"
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
        name="description"
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
        name="showMarker"
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
          name="x"
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
          name="y"
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
  )
}

type GroupDetailProps = {
  editMode: boolean
  group: GroupRecord
  sendTitle: (title: string | undefined) => void
}

export default GroupDetail
