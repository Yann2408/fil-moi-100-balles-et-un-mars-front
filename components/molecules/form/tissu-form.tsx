import * as yup from "yup";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Controller, FieldError, useForm } from "react-hook-form";
import endpoints from "../../../endpoints"
import useApi from "../../../hooks/api"
import { useRouter } from "next/router";
import useSWR from "swr";
import { yupResolver } from '@hookform/resolvers/yup';
import ITissuType from "../../../interfaces/tissus-type.interface";
import { useEffect, useState } from "react";
import ITissu from "../../../interfaces/tissus.interface";
import TissuTypeSelector from "../selector/tissu-type-selector";

interface TissuFormProps {
    id?: number
}

interface FormProps {
    id: number | undefined
    name: string
    tissu_type: ITissuType | undefined
    weight: number
    laize: number
    price: number
    stock: number
    by_on: string
    scrap: boolean
    pre_wash: boolean
    oekotex: boolean
    bio: boolean
    rating: number
    comment?: string | undefined
}

const TissuForm = (props: TissuFormProps): JSX.Element => {

    const { id } = props
    const { fetcher, request } = useApi()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [defaultValues, setDefaultValues] = useState<FormProps>({
        id: undefined,
        name: '',
        tissu_type: undefined,
        weight: 0,
        laize: 0,
        price: 0,
        stock: 0,
        by_on: '',
        scrap: false,
        pre_wash: false,
        oekotex: false,
        bio: false,
        rating: 0,
        comment: ''
    })

    const { data: tissu, mutate } = useSWR<ITissu>({
        url: id && endpoints.tissus.get(id),
        args: {
            data: {
                filters: { id: id },
            }
        }
    }, fetcher)


    const setDefaultTissu = (tissu: ITissu) => {
        setDefaultValues({
            id: tissu.id,
            name: tissu.name,
            tissu_type: tissu.tissu_type,
            weight: tissu.weight,
            laize: tissu.laize,
            price: tissu.price,
            stock: tissu.stock,
            by_on: tissu.by_on,
            scrap: tissu.scrap,
            pre_wash: tissu.pre_wash,
            oekotex: tissu.oekotex,
            bio: tissu.bio,
            rating: tissu.rating,
            comment: tissu.comment
        })
    }

    useEffect(() => {
        if (tissu) {
            setDefaultTissu(tissu)
        }
    }, [tissu]);



    const { control, handleSubmit, setError, reset, clearErrors, register, formState: { errors, isDirty } } = useForm<FormProps>({
        // resolver: yupResolver(schema),
        defaultValues
    });

    const [tissuTypeValue, setTissuTypeValue] = useState<string>('')

    const handleTissuTypeChange = (event: SelectChangeEvent) => {
        setTissuTypeValue(event.target.value as string);
    };

    const onSubmit = (args: FormProps) => {
        clearErrors()
        request({
            method: 'post',
            url: endpoints.tissus.post,
            args,
            setError,
            setLoading,
            //   setAlert,
            callback: () => {
                mutate()
                router.replace('/tissus/list')
            }
        })
    }

    const onDelete = () => {
        clearErrors()
        request({
            method: 'delete',
            url: endpoints.tissus.delete,
            args: { id: defaultValues.id },
            setError,
            setLoading,
            //   setAlert,
            callback: () => {
                router.replace('/tissus/list')
            }
        })
    }

    useEffect(() => {
        if (defaultValues && reset) {
            reset(defaultValues)
        }
    }, [defaultValues, reset])

    return (

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <Stack mt={2}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Nom du tissu"
                            variant="outlined"
                            error={errors?.name?.message ? true : false}
                            helperText={errors?.name?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="tissu_type"
                    control={control}
                    render={({ field }) =>
                        <TissuTypeSelector
                            value={tissuTypeValue}
                            onChange={handleTissuTypeChange}
                            size="small"
                        />
                    }
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="weight"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Poids"
                            variant="outlined"
                            InputProps={{
                                endAdornment:<InputAdornment position="end">g/m2</InputAdornment>
                            }}
                            error={errors?.weight?.message ? true : false}
                            helperText={errors?.weight?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

        </Box>

    )

}
export default TissuForm