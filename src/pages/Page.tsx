import { HTMLAttributes } from 'react'

const Page = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="flex h-screen overflow-hidden">{children}</div>
}

export default Page
