import axios from '../lib/axios'
import IKeyStringValue from '../interfaces/key-string-value.interface'
import { UseFormSetError } from 'react-hook-form'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import IAlert from '../interfaces/alert.interface'

interface IApiProps<T> {
    setError?: UseFormSetError<any>
    setLoading?: Dispatch<SetStateAction<boolean>>
    setAlert?: Dispatch<SetStateAction<IAlert | undefined>>
    url: string
    method?: 'post' | 'get' | 'put' | 'delete'
    args?: T
    callback?: (result: T) => void
    headers?: IKeyStringValue
}

const fetcher = ({ setLoading, url, args }: IApiProps<any>) => {

    if (!url) {
        return Promise.resolve(false)
    }

    return axios.get(url, {
        params: {
        ...args
        },
        headers: {
        // 'Accept-Language': lang
        }
    })
        .then(res => res.data)
        .catch(error => {
        if (error.response.status !== 400) throw error
        }).finally(() => setLoading && setLoading(false))
}

export default fetcher