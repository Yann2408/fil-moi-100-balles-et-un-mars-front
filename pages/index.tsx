import Loader from '../components/atoms/loader'
// import TAuth from 'components/templates/t-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [router])

  return <Loader />
  // return <TAuth><Loader /></TAuth>
}

export default Index
