import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import A from '../components/basic/A'
import P from '../components/basic/P'
import Logo from '../components/Logo'
import brand from '../resources/brand-1-low.jpg'

const LoginWrapper = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="bg-site flex w-full items-stretch justify-center p-4 md:min-h-screen">
      <div className="mx-auto flex w-full max-w-5xl md:gap-6">
        <div
          className="hidden flex-1 rounded-xl bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url(${brand})` }}
        ></div>
        <div className="min-w-0 flex-1 shrink-0 p-4 sm:p-8 md:flex-initial">
          <div className="mx-auto flex w-full max-w-sm flex-col gap-8 md:m-0">
            <Link to="/">
              <Logo className="mb-8 h-6" />
            </Link>
            {children}
            <div className="mt-8 border-t border-t-slate-300 pt-4">
              <P small>
                <strong>The smoothest hot desking app.</strong> Open-source, free to use for booking
                anything from tables to parking spaces.
              </P>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <A to={'/faq'}>Learn more about Kolbord</A>
                <A to={'/terms'} target="_blank">
                  Data protection
                </A>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginWrapper
