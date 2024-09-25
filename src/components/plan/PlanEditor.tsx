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

const PlanEditor = ({ planId, handleDelete, sendTitle }: PlanEditorProps) => {
  const { getToken } = useAuth()
  const userCanEdit = true

  const updatePlan = async (
    id: number,
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
  const plan: { data: PlanType } | undefined = queryClient.getQueryData(['zone', planId])
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: PlanType) => updatePlan(planId, data.name, data.svg),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['zones'] })
      await queryClient.cancelQueries({ queryKey: ['zone', planId] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['zones'],
      })
      queryClient.invalidateQueries({
        queryKey: ['zone', planId],
      })
    },
  })

  const { Field, handleSubmit, reset } = useForm<PlanType>({
    onSubmit: async ({ value }) => {
      mutate(value)
    },
    defaultValues: {
      id: plan?.data.id,
      name: plan?.data.name,
      svg: plan?.data.svg,
    },
  })

  useEffect(() => {
    reset()
  }, [reset, planId])

  useEffect(() => {
    sendTitle(plan?.data.name)
  }, [sendTitle, plan?.data.name])

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
      <PlanDelete planId={planId} planName={plan?.data.name} handleDelete={handleDelete} />
    </>
  )
}

type PlanEditorProps = {
  planId: number
  handleDelete: () => void
  sendTitle: (title: string | undefined) => void
}

export default PlanEditor
