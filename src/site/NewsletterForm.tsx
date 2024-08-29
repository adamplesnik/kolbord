import { useForm } from '@tanstack/react-form'
import { MailCheck, X } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/basic/Button'
import Heading from '../components/basic/Heading'
import InputWithLabel from '../components/basic/InputWithLabel'
import P from '../components/basic/P'

const NewsletterForm = () => {
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const subscribeToNewsletter = async (email: string, firstName: string): Promise<any> => {
    const subscriptionData = {
      data: {
        email: email,
        firstName: firstName,
      },
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter-subscriptions`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_NEWSLETTER}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      })

      if (response.ok) {
        setError(undefined)
        setSubscribed(true)
      } else {
        setError('Something went wrong, please try subscribing again.')
      }
    } catch {
      setError('Something went wrong, please try subscribing again.')
    }
  }

  const { Field, handleSubmit } = useForm({
    onSubmit: async ({ value }) => {
      await subscribeToNewsletter(value.email, value.firstName)
    },
    defaultValues: {
      email: '',
      firstName: '',
    },
  })

  return (
    <div className="bg-sidebar relative mx-auto flex w-full max-w-lg flex-col justify-center gap-2 overflow-hidden rounded-xl border border-2 border-pink-400/10 p-4 md:p-6">
      <Heading size={3}>Sign up for our newsletter!</Heading>
      <P className="pt-4">
        Be the first to know when we launch our public beta, discover new features, and learn that
        in Kolbord, you can book almost anything.
      </P>
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded border border-red-400 bg-red-50 py-2 px-3 text-red-700">
          {error}
        </div>
      )}
      {subscribed && (
        <>
          <div className="absolute inset-0 z-10 bg-slate-200/50"></div>
          <div className="absolute right-4 left-4 z-20 mb-4 flex items-center gap-2 rounded border border-emerald-600 bg-emerald-50 p-4 shadow-xl">
            <MailCheck strokeWidth={1.5} className="text-emerald-800" />
            <span className="flex-1">You are now subscribed, thank you!</span>
            <Button onClick={() => setSubscribed(false)} Icon={X} />
          </div>
        </>
      )}
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
            name="firstName"
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
          We keep your data safe. You can opt-out anytime.
          {/* For more details, see our
          <A to="/terms">Terms and conditions</A>. */}
        </span>
      </form>
    </div>
  )
}

export default NewsletterForm
