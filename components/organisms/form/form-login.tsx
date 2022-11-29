import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "../../../lib/axios";
import useSWR from "swr";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import router from "next/router";
import { useAuth } from "../../../hooks/auth";

interface FormLogin {
    email: string
    password: string
}

const FormLogin = (): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const schema = yup.object({
        email: yup.string().email().required('required'),
        password: yup.string().required('required'),
    }).required();

    const { login } = useAuth({
        middleware: 'guest',
        redirectTo: '/',
      })

    const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormLogin>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: FormLogin) => {
        clearErrors()
        login({ ...data, setError, setLoading })
      }

    // const { data: user, error, mutate } = useSWR('/api/auth/login', () =>
    //     axios
    //         .get('/api/auth/login')
    //         .then(res => res.data)
    //         .catch(error => {
    //             if (error.response.status !== 409) throw error
    //         }),
    // )

    // const csrf = () => axios.get('/sanctum/csrf-cookie')

    // const login = async (props: any) => {
    //     const { setError, setLoading } = props

    //     setLoading(true)

    //     await csrf()

    //     axios
    //         .post('/api/auth/login', props)
    //         .then(() => mutate())
    //         .catch(error => {
    //             setLoading(false)
    //             if (error.response.status !== 422) {
    //                 throw error
    //             }
    //             const apiErrors = error.response.data.errors
    //             Object.keys(apiErrors).forEach((field: string) => {
    //                 apiErrors[field].forEach((error: string) => {
    //                     setError(field, { type: 'manual', message: error })
    //                 })
    //             })
    //         })
    // }

    // const onSubmit = (data: FormLogin) => {
    //     clearErrors()
    //     login({ ...data, setError, setLoading })
    //     router.push('/home')
    //     // redirectTo: '/home'
    // }

    return (

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

            <Controller
                name="email"
                control={control}
                render={({ field }) =>
                    <TextField
                        type="email"
                        label="email"
                        margin="normal"
                        variant="filled"
                        size="medium"
                        fullWidth
                        autoFocus
                        autoComplete="email"
                        error={errors?.email?.message ? true : false}
                        helperText={errors?.email?.message && "Email ou mot de passe incorrect"}
                        {...field}
                    />}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) =>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        data-cy="password"
                        label="Mot de passe"
                        margin="normal"
                        size="medium"
                        variant="filled"
                        fullWidth
                        autoComplete="current-password"
                        error={errors?.password?.message ? true : false}
                        helperText={errors?.password?.message && "Email ou mot de passe incorrect"}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                        {...field}
                    />}
            />

            <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                size="large"
                sx={{ mt: 3, mb: 1, py: 1 }}
            >
                Se connecter
            </LoadingButton>

        </Box>

    )
}

export default FormLogin