import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'
import Button from '../basic/Button'
import InputWithLabel from '../basic/InputWithLabel'
import { usePlanQuery } from './loadPlan'

const PlanEditor = ({ planId }: PlanEditorProps) => {
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

  const { mutate } = useMutation({
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

  const { Field, handleSubmit } = useForm<PlanRecord>({
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

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
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
            <>
              <textarea
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                required
                className="border-slate-400 bg-slate-50 hover:border-slate-600"
                value={state.value}
              />
            </>
          )}
        />
        <Button type="submit">ss</Button>
      </form>
    </div>
  )
}

type PlanEditorProps = {
  planId: number
}

export default PlanEditor
