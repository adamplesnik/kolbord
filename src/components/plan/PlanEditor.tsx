import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'
import Button from '../basic/Button'
import FetchStatus from '../basic/FetchStatus'
import Heading from '../basic/Heading'
import InputWithLabel from '../basic/InputWithLabel'
import { usePlanQuery } from './loadPlan'
import PlanDelete from './PlanDelete'

const PlanEditor = ({ planId, handleDelete }: PlanEditorProps) => {
  const { user, userCanEdit } = useAuthContext()

  const updatePlan = async (
    id: number,
    name?: string,
    svg?: string | undefined
  ): Promise<PlanRecord> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/plans/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { name: name, svg: svg } }),
    })
    return response.json()
  }

  const { data: plan } = usePlanQuery(planId)

  const queryClient = useQueryClient()
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: PlanRecord) => updatePlan(planId, data.attributes.name, data.attributes.svg),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['plans'] })
      await queryClient.cancelQueries({ queryKey: ['plan', planId] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      })
      queryClient.invalidateQueries({
        queryKey: ['plan', planId],
      })
    },
  })

  const { Field, handleSubmit, reset } = useForm<PlanRecord>({
    onSubmit: async ({ value }) => {
      mutate(value)
    },
    defaultValues: {
      id: plan?.data.id,
      attributes: {
        name: plan?.data.attributes.name,
        svg: plan?.data.attributes.svg,
      },
    },
  })

  useEffect(() => {
    reset()
  }, [planId])

  if (!userCanEdit) {
    return ''
  }

  return (
    <>
      <Heading size={3}>{plan?.data.attributes.name}</Heading>
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
              value={state.value ?? ''}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              required
              inputType="text"
            />
          )}
        />
        <Field
          name="attributes.svg"
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
      <PlanDelete
        planId={planId}
        planName={plan?.data.attributes.name}
        planCompanyUuid={plan?.data.attributes.company?.data.attributes.uuid}
        userCompanyUuid={user?.company.uuid}
        handleDelete={handleDelete}
      />
    </>
  )
}

type PlanEditorProps = {
  planId: number
  handleDelete: () => void
}

export default PlanEditor
