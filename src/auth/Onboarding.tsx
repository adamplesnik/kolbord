import { useEffect, useState } from 'react'
import Loading from '../components/basic/Loading'
import { useAuthContext } from './AuthContext'
import { getToken } from './helpers'
import LoginWrapper from './LoginWrapper'

type Company = {
  data: {
    id: number
  }
}

const Onboarding = () => {
  const { user } = useAuthContext()
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState(0)

  const registerNewCompany = async (companyName: string): Promise<Company> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { name: companyName } }),
    })
    return response.json()
  }

  const updateUserCompany = async (companyId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?.id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ onboardingCompanyName: null, company: companyId }),
    })

    return response.json()
  }

  useEffect(() => {
    let ignore = false
    user && user.onboardingCompanyName && !ignore && setCompanyName(user.onboardingCompanyName)
    return () => {
      ignore = true
    }
  }, [user])

  useEffect(() => {
    companyName != '' &&
      registerNewCompany(companyName).then((result) => setCompanyId(result.data.id))
  }, [companyName])

  useEffect(() => {
    companyId > 0 && updateUserCompany(companyId)
  }, [companyId])

  return (
    <LoginWrapper showFooter={false}>
      <Loading loading={true} />
      We are setting things
    </LoginWrapper>
  )
}

export default Onboarding
