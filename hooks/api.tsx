// import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

// import IAlert from '../interfaces/alert.interface'
// import IKeyStringValue from '../interfaces/key-string-value.interface'
// import { UseFormSetError } from 'react-hook-form'
// import axios from '../lib/axios'
// import { useRouter } from 'next/router'
// import useSWR from 'swr'
// // import useTranslation from 'next-translate/useTranslation'

// // Use the optional prop interface to define the default props
// const defaultProps: useAuthProps = {
//   middleware: 'auth',
//   redirectTo: '/'
// };
// interface IApiProps<T> {
//   setError?: UseFormSetError<any>
//   setLoading?: Dispatch<SetStateAction<boolean>>
//   setAlert?: Dispatch<SetStateAction<IAlert | undefined>>
//   url: string
//   method?: 'post' | 'get' | 'put' | 'delete'
//   args?: T
//   callback?: (result: T) => void
//   headers?: IKeyStringValue
// }
// interface useAuthProps {
//   middleware?: 'guest' | 'auth'
//   redirectTo?: string
// }

// const useApi = (props?: useAuthProps) => {

//   const router = useRouter()
//   // const { t, lang } = useTranslation()

//   const fetcher = ({ setLoading, url, args }: IApiProps<any>) => {

//     if (!url) {
//       return Promise.resolve(false)
//     }

//     return axios.get(url, {
//       params: {
//         ...args
//       },
//       headers: {
//         // 'Accept-Language': lang
//       }
//     })
//       .then(res => res.data)
//       .catch(error => {
//         if (error.response.status !== 400) throw error
//       }).finally(() => setLoading && setLoading(false))
//   }

//   const request = async (props: IApiProps<any>) => {
//     const { setError, setLoading, setAlert, url, method = 'get', args, headers, callback } = props

//     setLoading && setLoading(true)
//     setAlert && setAlert(undefined)

//     await csrf()

//     axios(url, {
//       method,
//       data: method !== 'get' && method !== 'delete' ? args : undefined,
//       params: method === 'get' || method === 'delete' ? args : undefined,
//       headers: {
//         ...headers,
//         // 'Accept-Language': lang
//       }
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           setAlert && setAlert({ message: "Enregistrement réussi", severity: 'success' })
//         } else if (response.status === 204) {
//           setAlert && setAlert({ message: "Supression réussie", severity: 'success' })
//         }
//         mutate()
//         callback && callback(response.data)
//       })
//       .catch(error => {
//         setLoading && setLoading(false)
//         if (error.response.status !== 400) {
//           throw error
//         }

//         const apiErrors = error.response.data

//         Object.keys(apiErrors).forEach((field: string) => {

//           const normalizedField = field.replaceAll('.', '\\.')

//           const input = document.querySelector(
//             `input[name=${normalizedField}]`
//           );

//           input?.scrollIntoView({
//             behavior: 'smooth',
//             block: 'center',
//             inline: 'start',
//           });

//           apiErrors[field].forEach((error: string) => {
//             setError && setError(field, { type: 'manual', message: error })
//           })
//         })

//       }).finally(() => {
//         setLoading && setLoading(false)
//       })
//   }

//   const { data: user, error, mutate } = useSWR('/api/auth/profile', () =>

//     axios
//       .get('/api/auth/profile')
//       .then(res => res.data)
//       .catch(error => {
//         if (error.response.status !== 409) throw error
//       }),
//   )

//   const csrf = () => axios.get('/sanctum/csrf-cookie')


//   const logout = useCallback(async () => {

//     if(!error){
//       await csrf()

//       await axios
//         .get('/api/auth/logout')
//         .then(() => {
//           mutate()
//         })
//     } else {
//       location.replace("/login");
//     }
         
//   }, [error, mutate])

//   useEffect(() => {
//       if (props?.middleware === 'guest' && props?.redirectTo && user) router.push(props?.redirectTo)
//       if (props?.middleware === 'auth' && error) logout()
//   }, [user, error])

//   return {
//     user,
//     mutate,
//     fetcher,
//     request,
//     logout,
//     csrf
//   }
// }

// useApi.defaultProps = defaultProps;


// export default useApi