import { useForm } from '@tanstack/react-form'
import { setToken } from '../auth/helpers'

const LoginPage = () => {
  const tryLogin = async (userName: string, userPassword: string): Promise<any> => {
    const values = {
      identifier: userName,
      password: userPassword,
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/local?populate=*`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const data = await response.json()

    if (data?.error) {
      throw data?.error
    } else {
      setToken(data.jwt)
    }
  }

  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) => {
      tryLogin(value.userName, value.userPassword)
    },
    defaultValues: {
      userName: '',
      userPassword: '',
    },
  })

  return (
    <form
      className="mx-auto flex w-full max-w-sm flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Field
        name="userName"
        children={({ state, handleBlur, handleChange }) => (
          <input
            required
            type="text"
            className="w-full rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
            value={state.value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        )}
      />
      <Field
        name="userPassword"
        children={({ state, handleBlur, handleChange }) => (
          <input
            required
            type="password"
            className="w-full rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
            value={state.value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginPage
