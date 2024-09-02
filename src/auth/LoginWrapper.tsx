import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import A from '../components/basic/A'
import Heading from '../components/basic/Heading'
import P from '../components/basic/P'
import Logo from '../components/Logo'

const LoginWrapper = ({ showFooter = true, children, title = '' }: LoginWrapperProps) => {
  return (
    <div className="bg-site w-full md:min-h-screen">
      <div className="mx-auto flex w-full max-w-5xl overflow-hidden md:gap-16">
        <div className="mx-auto flex w-full flex-col gap-8 p-8 md:m-0">
          <Link to="https://kolbord.com">
            <Logo className="mb-8 h-6" />
          </Link>
          <Heading size={2}>{title}</Heading>
          {children}
        </div>
        <div className="sticky top-4 z-10 hidden max-h-[calc(100vh_-_2rem)] flex-1 rounded-xl bg-cover bg-center bg-no-repeat md:block"></div>
      </div>
      {showFooter && (
        <div className="mt-16 w-full border-t border-t-slate-200 bg-white">
          <div className="mx-auto max-w-5xl p-8">
            <P small className="max-w-sm">
              <strong>Kolbord</strong>
            </P>
            <P small className="max-w-sm">
              <strong>The smoothest hot desking app.</strong> Open-source, free to use for booking
              anything from tables to parking spaces.
            </P>
            <A to={'https://kolbord.com/faq'} target="_blank" className="block text-sm">
              Learn more about Kolbord
            </A>
          </div>
        </div>
      )}
    </div>
  )
}

type LoginWrapperProps = {
  showFooter?: boolean
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default LoginWrapper
