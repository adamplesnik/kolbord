import { useForm } from '@tanstack/react-form'
import { MailCheck, UserRoundX } from 'lucide-react'
import { useState } from 'react'
import LoginWrapper from '../auth/LoginWrapper'
import A from '../components/basic/A'
import Button from '../components/basic/Button'
import CheckboxWithLabel from '../components/basic/CheckboxWithLabel'
import InputWithLabel from '../components/basic/InputWithLabel'
import P from '../components/basic/P'

const RegisterCompanyAdminPage = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [isRegistered, setIsRegistered] = useState(false)

  const tryRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    onboardingCompanyName: string,
    agreeWithTerms: boolean
  ) => {
    const values = {
      email: email,
      username: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      onboardingCompanyName: onboardingCompanyName,
      agreeWithTerms: agreeWithTerms,
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/local/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const data = await response.json()

    if (response.ok) {
      setError(undefined)
      setIsRegistered(true)
    } else {
      setError(data?.error.message || 'Login error.')
      setIsRegistered(false)
    }
  }

  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) => {
      tryRegister(
        value.email,
        value.password,
        value.firstName,
        value.lastName,
        value.onboardingCompanyName,
        value.agreeWithTerms
      )
    },
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      onboardingCompanyName: '',
      agreeWithTerms: false,
    },
  })

  return (
    <LoginWrapper title="Register new company">
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="max-w-sm md:order-last md:max-w-max md:flex-1">
          <P>
            Register yourself as a company admin by providing your details along with the name of
            your company. You'll receive a confirmation email containing an activation link.
          </P>
          <P>
            For more information, explore{' '}
            <A to="https://kolbord.com/faq" target="_blank">
              how Kolbord works
            </A>
            .
          </P>
        </div>
        <div className="md:flex-1">
          {error && (
            <div className="flex items-center gap-2 rounded border border-red-400 bg-red-50 py-2 px-3 text-red-700">
              <UserRoundX className="size-6" strokeWidth={1.5} />
              {error}
            </div>
          )}
          {isRegistered ?
            <div className="flex items-center gap-3 rounded border border-emerald-600 bg-emerald-50 p-4 shadow-xl">
              <MailCheck strokeWidth={1.5} className="shrink-0 text-emerald-800" />
              <div>
                <strong className="pb-1">Registration successful</strong>
                <p>Check your email with the activation link.</p>
              </div>
            </div>
          : <form
              className="flex w-full max-w-sm flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <Field
                name="email"
                children={({ state, handleBlur, handleChange }) => (
                  <div className="flex flex-col gap-1">
                    <InputWithLabel
                      required
                      label="Email"
                      placeholder="Email"
                      inputType="email"
                      value={state.value}
                      // hasError={state.meta.errors != null}
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
                name="password"
                children={({ state, handleBlur, handleChange }) => (
                  <InputWithLabel
                    required
                    label="Password"
                    inputType="password"
                    placeholder="Password"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                  />
                )}
              />

              <Field
                name="firstName"
                children={({ state, handleBlur, handleChange }) => (
                  <InputWithLabel
                    required
                    label="Name"
                    inputType="text"
                    placeholder="Name"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                  />
                )}
              />
              <Field
                name="lastName"
                children={({ state, handleBlur, handleChange }) => (
                  <InputWithLabel
                    required
                    label="Last name"
                    inputType="text"
                    placeholder="Last name"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                  />
                )}
              />
              <Field
                name="onboardingCompanyName"
                children={({ state, handleBlur, handleChange }) => (
                  <InputWithLabel
                    required
                    label="Company name"
                    inputType="text"
                    placeholder="Company name"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                  />
                )}
              />
              <Field
                name="agreeWithTerms"
                children={({ state, handleBlur, handleChange }) => (
                  <CheckboxWithLabel
                    required
                    label={
                      <>
                        Check that you agree with our{' '}
                        <A to="terms" target="_blank">
                          Terms and conditions
                        </A>
                      </>
                    }
                    checked={state.value}
                    onChange={(e) => handleChange(e.target.checked)}
                    onBlur={handleBlur}
                  />
                )}
              />
              <Button type="submit" buttonType="primary" asBlock className="mt-2">
                Register
              </Button>
              <A to="/" className="mt-4 text-sm">
                Already registered? Log in.
              </A>
              <A to="/resend" className="text-sm">
                You did not receive the confirmation email?
              </A>
            </form>
          }
        </div>
      </div>
    </LoginWrapper>
  )
}

export default RegisterCompanyAdminPage
