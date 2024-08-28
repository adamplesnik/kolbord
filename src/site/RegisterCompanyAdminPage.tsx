import { useForm } from '@tanstack/react-form'
import Heading from '../components/basic/Heading'
import P from '../components/basic/P'
import LoginWrapper from './LoginWrapper'
import Button from '../components/basic/Button'
import { Link } from 'react-router-dom'
import InputWithLabel from '../components/basic/InputWithLabel'
import CheckboxWithLabel from '../components/basic/CheckboxWithLabel'
import Em from '../components/basic/Em'

const RegisterCompanyAdminPage = () => {
  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) => {
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
          Register as a <Em>company admin</Em> by providing your details along with your company
          name. You'll receive a confirmation email containing an activation link.
        </P>
        <P>
          For more information, explore <Link to="/faq">how Kolbord works.</Link>
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
                  <Link to="terms" target="_blank">
                    Terms and conditions
                  </Link>
                </>
              }
              checked={state.value}
              onChange={(e) => handleChange(e.target.checked)}
              onBlur={handleBlur}
            />
          )}
        />
        <div className="flex flex-col gap-4 pt-2">
          <Button type="submit" buttonType="primary" asBlock>
            Register
          </Button>
          <div className="flex flex-col gap-2">
            <Link to="/login">
              <Button buttonType="tertiary" className="text-sm">
                Already registered? Log in.
              </Button>
            </Link>
            <Link to="/resend">
              <Button buttonType="tertiary" className="text-sm">
                You did not receive the confirmation email?
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </LoginWrapper>
  )
}

export default RegisterCompanyAdminPage
