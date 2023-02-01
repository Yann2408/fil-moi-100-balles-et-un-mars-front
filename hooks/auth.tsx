import axios from '../lib/axios'
// import setLanguage from 'next-translate/setLanguage'
import useApi from '../hooks/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
// import useTranslation from 'next-translate/useTranslation'

interface useAuthProps {
  middleware?: 'guest' | 'auth'
  redirectTo?: string
}

export const useAuth = ({ middleware = 'auth', redirectTo = '/' }: useAuthProps) => {
  const router = useRouter()
//   const { lang } = useTranslation()

  const { logout, csrf } = useApi({
    middleware: middleware,
    redirectTo: redirectTo,
  })

  const { data: user, error, mutate } = useSWR('/api/auth/me', () =>
    axios
      .get('/api/auth/me')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )

  const login = async (props: any) => {
    const { setError, setLoading } = props

    setLoading(true)

    await csrf()

    axios
      .post('/api/auth/login', props)
      .then(() => mutate())
      .catch(error => {
        setLoading(false)
        if (error.response.status !== 422) {
          throw error
        }
        const apiErrors = error.response.data.errors
        Object.keys(apiErrors).forEach((field: string) => {
          apiErrors[field].forEach((error: string) => {
            setError(field, { type: 'manual', message: error })
          })
        })
      })
  }

//   const updatePersonalInfo = async (props: any) => {
//     const { setError, setLoading, setAlert } = props

//     setLoading(true)
//     setAlert()

//     await csrf()

//     axios
//       .post('/api/auth/profile/personal-info', props)
//       .then((response) => {
//         setAlert({ message: response.data.status, severity: response.data.success === true ? 'success' : 'danger' })
//         mutate()
//       })
//       .catch(error => {
//         setLoading(false)
//         if (error.response.status !== 422) {
//           throw error
//         }
//         const apiErrors = error.response.data.errors
//         Object.keys(apiErrors).forEach((field: string) => {
//           apiErrors[field].forEach((error: string) => {
//             setError(field, { type: 'manual', message: error })
//           })
//         })
//       }).finally(() => {
//         setLoading(false)
//       })
//   }


//   const updateSecurity = async (props: any) => {
//     const { setError, setLoading, setAlert } = props

//     setLoading(true)
//     setAlert()

//     await csrf()

//     axios
//       .post('/api/auth/profile/security', props)
//       .then((response) => {
//         setAlert({ message: response.data.status, severity: response.data.success === true ? 'success' : 'danger' })
//         mutate()
//       })
//       .catch(error => {
//         setLoading(false)
//         if (error.response.status !== 422) {
//           throw error
//         }
//         const apiErrors = error.response.data.errors
//         Object.keys(apiErrors).forEach((field: string) => {
//           apiErrors[field].forEach((error: string) => {
//             setError(field, { type: 'manual', message: error })
//           })
//         })
//       }).finally(() => {
//         setLoading(false)
//       })
//   }

  const passwordForgotten = async (props: any) => {
    const { setError, setLoading, setAlert } = props
    setLoading(true)
    setAlert()

    await csrf()

    axios
      .post('/api/auth/password-forgotten', props)
      .then(response => setAlert({ message: response.data.status, severity: 'success' }))
      .catch(error => {
        if (error.response.status !== 422) {
          throw error
        }
        const apiErrors = error.response.data.errors
        Object.keys(apiErrors).forEach((field: string) => {
          apiErrors[field].forEach((error: string) => {
            setError(field, { type: 'manual', message: error })
          })
        })
      }).finally(() => setLoading(false))
  }

  const resetPassword = async (props: any) => {
    const { setError, setLoading, setAlert } = props
    setLoading(true)
    setAlert()

    await csrf()

    axios
      .post('/api/auth/reset-password', { ...props, token: router.query.token, email: router.query.email })
      .then(response => router.push(redirectTo + '/login?message=' + response.data.status + '&severity=success'))
      .catch(error => {
        setAlert({ message: error.response.data.message, severity: 'error' })
        setLoading(false)
        if (error.response.status !== 422) {
          throw error
        }
        const apiErrors = error.response.data.errors
        Object.keys(apiErrors).forEach((field: string) => {
          apiErrors[field].forEach((error: string) => {
            setError(field, { type: 'manual', message: error })
          })
        })
      })
  }

//   const magicLink = async (props: any) => {
//     const { setError, setLoading, setAlert } = props
//     setLoading(true)
//     setAlert()

//     await csrf()

//     axios
//       .post('/api/auth/magic-link', props)
//       .then(response => setAlert({ message: response.data.status, severity: 'success' }))
//       .catch(error => {
//         setAlert({ message: error.response.data.message, type: 'error' })
//         if (error.response.status !== 422) {
//           throw error
//         }
//         const apiErrors = error.response.data.errors
//         Object.keys(apiErrors).forEach((field: string) => {
//           apiErrors[field].forEach((error: string) => {
//             setError(field, { type: 'manual', message: error })
//           })
//         })
//       }).finally(() => setLoading(false))
//   }

//   const magicLinkLogin = async () => {
//     await csrf()

//     axios
//       .post('/api/auth/magic-link/check', { token: router.query.token })
//       .then(() => router.push(redirectTo))
//       .catch(error => {
//         router.push(redirectTo + '/login?message=' + error.response.data.status + '&severity=error')
//       })
//   }

  useEffect(() => {

    // if (user && lang !== user.profile.preferred_language.code) {
    //   setLanguage(user.profile.preferred_language.code)
    // }

    if (middleware === 'guest' && redirectTo && user) router.push(redirectTo)
    if (middleware === 'auth' && error) logout()
  }, [user, error, middleware, redirectTo, router, logout])
//   }, [user, error, middleware, redirectTo, router, logout, lang])

  return {
    user,
    login,
    // magicLink,
    // magicLinkLogin,
    passwordForgotten,
    resetPassword,
    // updatePersonalInfo,
    // updateSecurity,
    logout,
  }
}
