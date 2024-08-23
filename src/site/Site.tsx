import Logo from '../components/Logo'

const Site = () => {
  return (
    <div className="bg-site min-h-screen bg-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 pt-16 px-12 pb-12">
        <div className="flex items-center justify-center">
          <Logo className="h-8" />
          <div className="hidden">menu</div>
          <div className="hidden">action</div>
        </div>
        <h1 className="mx-auto max-w-2xl text-center text-5xl font-semibold leading-snug">
          The smoothest
          <br />
          hot desking app.
        </h1>
        <h2 className="mx-auto max-w-xl text-center text-3xl font-semibold leading-snug">
          Open-source, free to use for booking anything from tables to parking spaces.
        </h2>
      </div>
    </div>
  )
}

export default Site
