import * as yup from "yup";
import { Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, Rating, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import endpoints from "../../../endpoints"
import useApi from "../../../hooks/api"
import { useRouter } from "next/router";
import useSWR from "swr";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import ITissu from "../../../interfaces/tissus.interface";
import TissuTypeSelector from "../selector/tissu-type-selector";
import FormConfirm from "../../atoms/form-confirm";
import { LoadingButton } from "@mui/lab";

interface TissuFormProps {
    id?: number
}

interface FormProps {
    id: number | undefined
    name: string
    tissu_type: string | undefined
    weight: number | undefined
    laize: number | undefined
    price: number | undefined
    stock: number | undefined
    by_on: string
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

    const [tissuTypeValue, setTissuTypeValue] = useState<string>()
    const [ratingValue, setRatingValue] = useState<number | null>(0);

    const [modalTitle, setModalTitle] = useState<string>('')

    const [defaultValues, setDefaultValues] = useState<FormProps>({
        id: undefined,
        name: '',
        tissu_type: '',
        weight: undefined,
        laize: undefined,
        price: undefined,
        stock: undefined,
        by_on: '',
        pre_wash: false,
        oekotex: false,
        bio: false,
        rating: 1,
        comment: ''
    })

    const { data: tissu, mutate } = useSWR<ITissu>({
        url: id && endpoints.tissus.get(id),
        args: {
            id: id,
        }
    }, fetcher)


    const setDefaultTissu = (tissu: ITissu) => {
        setDefaultValues({
            id: tissu.id,
            name: tissu.name,
            tissu_type: tissu.tissu_type.name,
            weight: tissu.weight,
            laize: tissu.laize,
            price: tissu.price,
            stock: tissu.stock,
            by_on: tissu.by_on,
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
            setTissuTypeValue(tissu.tissu_type.name)
            setRatingValue(tissu.rating)
        }
    }, [tissu]);

    const schema = yup.object({
        name: yup.string().required('Ce champ est obligatoire'),
        tissu_type: yup.string().required('Ce champ est obligatoire'),
        weight: yup.number().typeError('Ce champ est obligatoire').positive('Doit être un nombre positif').required('Ce champ est obligatoire'),
        laize: yup.number().typeError('Ce champ est obligatoire').positive('Doit être un nombre positif').required('Ce champ est obligatoire'),
        price: yup.number().typeError('Ce champ est obligatoire').positive('Doit être un nombre positif').required('Ce champ est obligatoire'),
        stock: yup.number().typeError('Ce champ est obligatoire').positive('Doit être un nombre positif').required('Ce champ est obligatoire'),
        by_on: yup.string().required('Ce champ est obligatoire'),
        pre_wash: yup.boolean().required('Ce champ est obligatoire'),
        oekotex: yup.boolean().required('Ce champ est obligatoire'),
        bio: yup.boolean().required('Ce champ est obligatoire'),
        rating: yup.boolean().required('Ce champ est obligatoire'),
        comment: yup.string(),
    })

    const { control, handleSubmit, setError, reset, clearErrors, register, formState: { errors, isDirty } } = useForm<FormProps>({
        resolver: yupResolver(schema),
        defaultValues
    });



    const handleTissuTypeChange = (event: SelectChangeEvent) => {
        setTissuTypeValue(event.target.value as string);
    };

    const onSubmit = (args: FormProps) => {
        args.rating = ratingValue ? ratingValue : defaultValues.rating
        args.tissu_type = tissuTypeValue ? tissuTypeValue : defaultValues.tissu_type
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
                // router.replace('/tissus/list')
            }
        })
    }

    const onDeleteAction = () => {
        setModalTitle("delete")
        setDeleteModalOpen(true)
    }

    const onResetAction = () => {
        setModalTitle("reset")
        setDeleteModalOpen(true)
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

    const onReset = () => {
        reset(defaultValues)
        setTissuTypeValue(defaultValues.tissu_type)
        setRatingValue(defaultValues.rating)
        setDeleteModalOpen(false)
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
                            InputLabelProps={{
                                shrink: defaultValues.id ? true : false
                            }}
                            error={errors?.name?.message ? true : false}
                            helperText={errors?.name?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            {defaultValues.tissu_type !== '' ? <Stack mt={3}>
                <Controller
                    name="tissu_type"
                    control={control}
                    render={({ field }) =>
                        <TissuTypeSelector
                            {...field}
                            value={tissuTypeValue}
                            onChange={handleTissuTypeChange}
                            size="small"
                        />
                    }
                />
            </Stack> : undefined}

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
                            InputLabelProps={{
                                shrink: defaultValues.id ? true : false
                            }}
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
                            InputLabelProps={{
                                shrink: defaultValues.id ? true : false
                            }}
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
                                shrink: defaultValues.id ? true : false
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
                            InputLabelProps={{
                                shrink: defaultValues.id ? true : false
                            }}
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
                            InputLabelProps={{
                                shrink: defaultValues.id ? true : false
                            }}
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
                <FormControlLabel
                    control={
                        <Rating
                            name="rating"
                            precision={0.5}
                            // defaultValue={defaultValues.rating}
                            value={ratingValue}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                    }
                    label=""
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

            <Stack direction='row' spacing={2} mt={2} justifyContent='space-between'>
                {defaultValues.id !== undefined ? <>
                    <Button variant="outlined" color="error" size="small" onClick={() => onDeleteAction()}>
                        Supprimer
                    </Button>

                    <FormConfirm
                        title={modalTitle === "delete" ? "Supprimer le tissu ?" : "Annuler les changements ?"}
                        action={modalTitle === "delete" ? () => onDelete() : () => onReset()}
                        open={deleteModalOpen}
                        loading={loading}
                        ctaColor="error"
                        setOpen={setDeleteModalOpen}
                    />
                </> : <div />}

                <Button variant="outlined" size="medium" onClick={() => onResetAction()}>
                    Reset
                </Button>

                <LoadingButton
                    type="submit"
                    variant="outlined"
                    loading={loading}
                // disabled={!isDirty}
                >
                    Valider
                </LoadingButton>
            </Stack>

        </Box>

    )

}
export default TissuForm