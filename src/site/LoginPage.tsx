import { useForm } from '@tanstack/react-form'
import { KeyRoundIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { removeToken, setToken } from '../auth/helpers'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import InputWithLabel from '../components/basic/InputWithLabel'
import P from '../components/basic/P'
import LoginWrapper from './LoginWrapper'

const LoginPage = () => {
  const { user } = useAuthContext()
  const [error, setError] = useState<string | undefined>(undefined)

  const tryLogin = async (userName: string, userPassword: string): Promise<any> => {
    const values = {
      identifier: userName,
      password: userPassword,
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/local?populate=*`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        setError(undefined)
        setToken(data.jwt)
      } else {
        setError(data?.error.message || 'Login error.')
        removeToken()
      }
    } catch {
      setError('An unexpected error occurred.')
    }
  }

  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) => {
      await tryLogin(value.userName, value.userPassword)
    },
    defaultValues: {
      userName: '',
      userPassword: '',
    },
  })

  if (user) {
    return <Navigate to="/plan" />
  }

  return (
    <LoginWrapper>
      <Heading size={2} className="text-center">
        Login
      </Heading>
      <P className="text-center">Login into your Kolbord account.</P>
      {error && (
        <div className="flex items-center gap-2 rounded border border-red-400 bg-red-50 py-2 px-3 text-red-700">
          <KeyRoundIcon className="size-6" strokeWidth={1.5} />
          {error}
        </div>
      )}
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
            <div className="flex flex-col gap-1">
              <InputWithLabel
                loose
                required
                label="E-mail and password"
                placeholder="E-mail"
                inputType="email"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
              {state.meta.errors && (
                <span className="text-xs text-red-600">{state.meta.errors.join(', ')}</span>
              )}
            </div>
          )}
        />
        <Field
          name="userPassword"
          children={({ state, handleBlur, handleChange }) => (
            <InputWithLabel
              loose
              required
              inputType="password"
              placeholder="Password"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
            />
          )}
        />
        <div className="flex flex-col gap-4 pt-2">
          <Button type="submit" buttonType="primary" asBlock>
            Login
          </Button>
          <div className="flex flex-col gap-2">
            <Link to="/password">
              <Button buttonType="tertiary" className="text-sm">
                Did you forgot your password?
              </Button>
            </Link>
            <Link to="/register">
              <Button buttonType="tertiary" className="text-sm">
                Register new company
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </LoginWrapper>
  )
}

export default LoginPage
