import { useAuth } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import Button from '../basic/Button'
import FetchStatus from '../basic/FetchStatus'
import InputWithLabel from '../basic/InputWithLabel'
import PlanDelete from './PlanDelete'
import { PlanType } from './planType'
import { useZone } from './useZone'

const PlanEditor = ({ handleDelete, sendTitle }: PlanEditorProps) => {
  const { getToken } = useAuth()
  const { data: zone } = useZone()
  const zoneId = zone?.data.id

  const userCanEdit = true

  const updatePlan = async (
    id: number | undefined,
    name?: string,
    svg?: string | undefined
  ): Promise<PlanType> => {
    return await axios.patch(
      `${import.meta.env.VITE_API_PAYLOAD_URL}/zones/${id}`,
      JSON.stringify({ name: name, svg: svg }),
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
    mutationFn: (data: PlanType) => updatePlan(zoneId, data.name, data.svg),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['zones'] })
      await queryClient.cancelQueries({ queryKey: ['zone'] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['zones'],
      })
      queryClient.invalidateQueries({
        queryKey: ['zone'],
      })
    },
  })

  const { Field, handleSubmit, reset } = useForm<PlanType>({
    onSubmit: async ({ value }) => {
      mutate(value)
    },
    defaultValues: {
      id: zone?.data.id,
      name: zone?.data.name,
      svg: zone?.data.svg,
    },
  })

  useEffect(() => {
    reset()
  }, [reset, zoneId])

  useEffect(() => {
    sendTitle(zone?.data.name)
  }, [sendTitle, zone?.data.name])

  if (!userCanEdit) {
    return ''
  }

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
          name="name"
          children={({ state, handleChange, handleBlur }) => (
            <InputWithLabel
              label="Name"
              value={state.value ?? ''}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              required
              inputType="text"
            />
          )}
        />
        <Field
          name="svg"
          children={({ state, handleChange, handleBlur }) => (
            <div className="flex flex-col gap-1">
              <span className="block text-xs font-bold">SVG</span>
              <textarea
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                required
                className="h-64 rounded border-slate-400 bg-slate-50 py-1 px-2 font-mono text-sm hover:border-slate-600"
                value={state.value}
              />
            </div>
          )}
        />
        <Button type="submit" asBlock buttonType="primary">
          Update plan
        </Button>
      </form>
      <PlanDelete zoneId={zoneId} planName={zone?.data.name} handleDelete={handleDelete} />
    </>
  )
}

type PlanEditorProps = {
  handleDelete: () => void
  sendTitle: (title: string | undefined) => void
}

export default PlanEditor
