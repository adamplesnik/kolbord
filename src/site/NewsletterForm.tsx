import { useForm } from '@tanstack/react-form'
import A from '../components/basic/A'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import InputWithLabel from '../components/basic/InputWithLabel'
import P from '../components/basic/P'

const NewsletterForm = () => {
  const { Field, handleSubmit } = useForm({
    // onSubmit: async ({ value }) => {
    //   await subscribeToNewsletter(value.name, value.email)
    // },
    defaultValues: {
      email: '',
      name: '',
    },
  })

  return (
    <div className="bg-sidebar mx-auto flex w-full max-w-lg flex-col justify-center gap-2 rounded-xl border border-2 border-pink-400/10 p-4 md:p-6">
      <Heading size={3}>Sign up for our newsletter!</Heading>
      <P className="pt-4">
        Be the first to know when we launch our public beta, discover new features, and learn that
        in Kolbord, you can book almost anything.
      </P>
      <form
        className="mx-auto flex w-full flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:*:flex-1">
          <Field
            name="email"
            children={({ state, handleBlur, handleChange }) => (
              <InputWithLabel
                loose
                required
                label="Your email"
                placeholder="Your email"
                inputType="email"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
            )}
          />
          <Field
            name="name"
            children={({ state, handleBlur, handleChange }) => (
              <InputWithLabel
                loose
                required
                label="Your first name"
                inputType="text"
                placeholder="Your first name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
            )}
          />
        </div>
        <Button type="submit" buttonType="primary" asBlock className="mt-1">
          Subscribe
        </Button>
        <span className="pt-2 text-xs text-slate-600">
          We keep your data safe. For more details, please see our{' '}
          <A to="/terms">Terms and conditions</A>.
        </span>
      </form>
    </div>
  )
}

export default NewsletterForm
