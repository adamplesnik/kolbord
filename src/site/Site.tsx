import Logo from '../components/Logo'

const Site = () => {
  return (
    <div className="bg-site min-h-screen bg-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 pt-8 px-12 pb-12">
        <div className="flex items-center justify-between">
          <Logo className="h-8" />
          <div>menu</div>
          <div>action</div>
        </div>
        <h1 className="mx-auto max-w-2xl text-center text-5xl font-semibold leading-snug">
          The smoothest open-source hot desking app.
        </h1>
        <h2 className="mx-auto max-w-xl text-center text-3xl font-semibold">
          Free forever. Book anything from desks
          <br />
          to parking spaces.
        </h2>
      </div>
    </div>
  )
}

export default Site
