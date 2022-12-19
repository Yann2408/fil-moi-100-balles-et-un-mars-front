import * as yup from "yup";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Rating, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
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
import FormConfirm from "../../atoms/form-confirm";

interface TissuFormProps {
    id?: number
}

interface FormProps {
    id: number | undefined
    name: string
    tissu_type: ITissuType | undefined
    weight: number | undefined
    laize: number | undefined
    price: number | undefined
    stock: number | undefined
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
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

    const [ratingValue, setRatingValue] = useState<number | null>(null);

    const [defaultValues, setDefaultValues] = useState<FormProps>({
        id: undefined,
        name: '',
        tissu_type: undefined,
        weight: undefined,
        laize: undefined,
        price: undefined,
        stock: undefined,
        by_on: '',
        scrap: false,
        pre_wash: false,
        oekotex: false,
        bio: false,
        rating: 1,
        comment: ''
    })

    const { data: tissu, mutate } = useSWR<ITissu>({
        url: id && endpoints.tissus.get(id),
        args: {
              id: id ,          
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

    console.log(defaultValues)

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
                                endAdornment: <InputAdornment position="end">g/m2</InputAdornment>
                            }}
                            error={errors?.weight?.message ? true : false}
                            helperText={errors?.weight?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="laize"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Laize"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}
                            error={errors?.laize?.message ? true : false}
                            helperText={errors?.laize?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Prix"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                              }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€/m</InputAdornment>
                            }}
                            error={errors?.price?.message ? true : false}
                            helperText={errors?.price?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="stock"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Stock"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">m</InputAdornment>
                            }}
                            error={errors?.stock?.message ? true : false}
                            helperText={errors?.stock?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="by_on"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Acheté chez"
                            variant="outlined"
                            error={errors?.by_on?.message ? true : false}
                            helperText={errors?.by_on?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={3} >
                <Grid container spacing={0} direction="row" justifyContent="space-between">
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="scrap"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            {...field}
                                        />
                                    )}
                                />
                            }
                            label="Scrap"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="oekotex"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            {...field}
                                        />
                                    )}
                                />
                            }
                            label="Oekotex"
                            labelPlacement="start"
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="bio"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            {...field}
                                        />
                                    )}
                                />
                            }
                            label="Bio"
                            labelPlacement="start"
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="pre_wash"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            {...field}
                                        />
                                    )}
                                />
                            }
                            label="Pre-Wash"
                            labelPlacement="start"
                        />
                    </Grid>
                </Grid>
            </Stack>

            <Stack sx={{ mt: 2, '& > legend': { mt: 0 } }} flexDirection='row' alignItems="center">

                <Typography sx={{ mr: 1 }} component="legend">Note</Typography>
                <Rating
                    name="rating"
                    precision={0.5}
                    defaultValue={defaultValues.rating}
                    value={ratingValue}
                    onChange={(event, newValue) => {
                        setRatingValue(newValue);
                    }}
                />
            </Stack>

            <Stack mt={3}>
                <Controller
                    name="comment"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            multiline
                            rows={4}
                            label="Commentaire"
                            variant="outlined"
                            error={errors?.stock?.message ? true : false}
                            helperText={errors?.stock?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            {defaultValues.id !== undefined ? <>
                <Button variant="contained" color="error" size="small" onClick={() => setDeleteModalOpen(true)}>
                    Supprimer
                </Button>

                <FormConfirm
                    title="Supprimer le tissu ?"
                    text="Voulez vous vraiment supprimer le tissu"
                    action={() => onDelete()}
                    open={deleteModalOpen}
                    loading={loading}
                    ctaColor="error"
                    setOpen={setDeleteModalOpen}
                />
            </> : <div />}

        </Box>

    )

}
export default TissuForm