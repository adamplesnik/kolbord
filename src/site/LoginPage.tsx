import { useForm } from '@tanstack/react-form'
import { setToken } from '../auth/helpers'
import Button from '../components/basic/Button'
import InputWithLabel from '../components/basic/InputWithLabel'
import LoginWrapper from './LoginWrapper'
import P from '../components/basic/P'
import Heading from '../components/basic/Heading'

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
    <LoginWrapper>
      <Heading size={2} className="text-center">
        Login
      </Heading>
      <P className="text-center">Login into your Kolbord account.</P>
      <form
        className="mx-auto flex w-full max-w-sm flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Field
          name="userName"
          children={({ state, handleBlur, handleChange }) => (
            <InputWithLabel
              loose
              required
              label="E-mail and password"
              placeholder="E-mail"
              inputType="text"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
            />
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
        <div className="flex flex-col gap-4">
          <Button onClick={() => handleSubmit} buttonType="primary" asBlock>
            Login
          </Button>
          <Button buttonType="tertiary" className="text-sm">
            Did you forgot your password?
          </Button>
        </div>
      </form>
    </LoginWrapper>
  )
}

export default LoginPage
