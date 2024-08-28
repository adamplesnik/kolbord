import { useForm } from '@tanstack/react-form'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import P from '../components/basic/P'
import LoginWrapper from './LoginWrapper'

import A from '../components/basic/A'
import CheckboxWithLabel from '../components/basic/CheckboxWithLabel'
import InputWithLabel from '../components/basic/InputWithLabel'

const RegisterCompanyAdminPage = () => {
  const { Field, handleSubmit } = useForm({
    onSubmit: async () => {
      // await tryRegister(value.userName, value.userPassword)
    },
    defaultValues: {
      userName: '',
      userPassword: '',
      userFirstName: '',
      userLastName: '',
      companyName: '',
      agreeWithTerms: false,
    },
  })

  return (
    <LoginWrapper>
      <Heading size={2}>Register new company</Heading>
      <div>
        <P>
          Register as a company admin by providing your details along with your company name. You'll
          receive a confirmation email containing an activation A.
        </P>
        <P>
          For more information, explore{' '}
          <A to="/faq" target="_blank">
            how Kolbord works
          </A>
          .
        </P>
      </div>
      <form
        className="mx-auto flex w-full max-w-sm flex-col gap-3"
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
                label="Email"
                placeholder="Email"
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
          name="userFirstName"
          children={({ state, handleBlur, handleChange }) => (
            <InputWithLabel
              loose
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
          name="userLastName"
          children={({ state, handleBlur, handleChange }) => (
            <InputWithLabel
              loose
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
          name="companyName"
          children={({ state, handleBlur, handleChange }) => (
            <InputWithLabel
              loose
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
        <A to="/login" className="mt-4 text-sm">
          <Button buttonType="tertiary">Already registered? Log in</Button>
        </A>
        <A to="/resend" className="text-sm">
          You did not receive the confirmation email?
        </A>
      </form>
    </LoginWrapper>
  )
}

export default RegisterCompanyAdminPage
