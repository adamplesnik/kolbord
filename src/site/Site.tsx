import Em from '../components/basic/Em'
import Logo from '../components/Logo'
import NewsletterForm from './NewsletterForm'

const Site = () => {
  return (
    <div className="bg-site min-h-screen bg-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 pt-16 px-12 pb-12">
        <div className="flex items-center justify-center">
          <Logo className="h-7" />
          <div className="hidden">menu</div>
          <div className="hidden">action</div>
        </div>
        <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold leading-snug md:text-5xl">
          The smoothest
          <br />
          hot desking app.
        </h1>
        <h2 className="mx-auto max-w-xl text-center text-xl font-semibold leading-snug md:text-2xl">
          Open-source, <Em>free to use</Em> for booking anything from tables to parking spaces.
        </h2>
        <NewsletterForm />
      </div>
    </div>
  )
}

export default Site
