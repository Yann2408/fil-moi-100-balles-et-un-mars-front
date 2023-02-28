import * as yup from "yup";
import { Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, Rating, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import endpoints from "../../../endpoints"
import useApi from "../../../hooks/api"
import { useRouter } from "next/router";
import useSWR from "swr";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import FormConfirm from "../../atoms/form-confirm";
import { LoadingButton } from "@mui/lab";
import { errorMessages } from "../../../hooks/utils";
import IPattern from "../../../interfaces/pattern-interface";
import SupportSelector from "../selector/patterns/support-selector";

interface PatternFormProps {
    id?: number
}

interface FormProps {
    id: number | undefined
    name: string
    brand: string
    support: string | undefined
    newSupport: string | undefined
    clothing_type: string
    silhouette: string
    rating: number
    comment?: string | undefined
    user_id: number | undefined
}

const PatternForm = (props: PatternFormProps): JSX.Element => {

    const { id } = props
    const { fetcher, request, user } = useApi()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

    const [supportValue, setSupportValue] = useState<string>()
    const [newSupportValue, setNewSupportValue] = useState<string>()
    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const [userId, setUserId] = useState<number | undefined>();

    const [modalTitle, setModalTitle] = useState<string>('')

    const [defaultValues, setDefaultValues] = useState<FormProps>({
        id: undefined,
        name: "",
        brand: "",
        support: "",
        newSupport: "",
        clothing_type: "",
        silhouette: "",
        rating: 1,
        comment: '',
        user_id: undefined
    })

    const { data: pattern, mutate } = useSWR<IPattern>({
        url: id && endpoints.patterns.get(id),
        args: {
            id: id,
        }
    }, fetcher)


    // console.log(pattern, "pattern")

    const setDefaultPattern = (pattern: IPattern) => {
        setDefaultValues({
            id: pattern.id,
            name: pattern.name,
            brand: pattern.brand,
            // support: pattern?.support,
            support: pattern?.support ? pattern.support : undefined,
            newSupport: "",
            clothing_type: pattern.clothing_type,
            silhouette: pattern.silhouette,
            rating: pattern.rating,
            comment: pattern.comment,
            user_id: Number(user.id)
        })
    }

    useEffect(() => {
        if (pattern) {
            console.log(pattern, "pattern")
            setDefaultPattern(pattern)
            setSupportValue(pattern.support)
            setRatingValue(pattern.rating)
            setUserId(user.id)
        }
    }, [pattern]);

    useEffect(() => {
        if (user) {
            setUserId(user.id)
        }
    }, [user]);

    const schema = yup.object({
        name: yup.string().required(errorMessages.required),
        brand: yup.string().required(errorMessages.required),
        // support: yup.string().required(errorMessages.required),
        support: yup.string().nullable(),
        new_support: yup.string().nullable(),
        clothing_type: yup.string().required(errorMessages.required),
        silhouette: yup.string().required(errorMessages.required),
        rating: yup.number().required(errorMessages.required),
        comment: yup.string().nullable(),
        user_id: yup.number().required('required')
    })

    const { control, handleSubmit, setError, reset, clearErrors, register, formState: { errors, isDirty } } = useForm<FormProps>({
        resolver: yupResolver(schema),
        defaultValues
    });

    const handleSupportChange = (event: SelectChangeEvent) => {
        setSupportValue(event.target.value as string);
    };

    const handleNewSupportChange = (event: SelectChangeEvent) => {
        setNewSupportValue(event.target.value as string);
    };

    const onSubmit = (args: FormProps) => {

        console.log(142)
        args.rating = ratingValue ? ratingValue : defaultValues.rating
        args.support = supportValue ? supportValue : defaultValues.support
        args.newSupport = newSupportValue ? newSupportValue : defaultValues.newSupport
        console.log(args, "args")
        clearErrors()
        request({
            method: 'post',
            url: endpoints.patterns.post,
            args,
            setError,
            setLoading,
            //   setAlert,
            callback: () => {
                mutate()
                router.replace('/patterns/list')
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
            url: endpoints.patterns.delete,
            args: { id: defaultValues.id },
            setError,
            setLoading,
            //   setAlert,
            callback: () => {
                router.replace('/patterns/list')
            }
        })
    }

    const onReset = () => {
        reset(defaultValues)
        setSupportValue(defaultValues.support)
        // setNewSupportValue(defaultValues.newSupport)
        setRatingValue(defaultValues.rating)
        setDeleteModalOpen(false)
    }

    useEffect(() => {
        if (defaultValues && reset) {
            reset(defaultValues)
        }
    }, [defaultValues, reset])

    console.log(supportValue, "supportValue")
    // console.log(newSupportValue, "newsupportValue")

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
                            label="Nom"
                            variant="outlined"
                            error={errors?.name?.message ? true : false}
                            helperText={errors?.name?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={2}>
                <Controller
                    name="brand"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Marque"
                            variant="outlined"
                            error={errors?.name?.message ? true : false}
                            helperText={errors?.name?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            {defaultValues.support !== "" ? <Stack mt={2}>
                <Controller
                    name="support"
                    control={control}
                    render={({ field }) =>
                        <SupportSelector
                            {...field}
                            value={supportValue}
                            onChange={handleSupportChange}
                            size="small"
                        />
                    }
                />
            </Stack> : null}

            {defaultValues.id === undefined ? <Stack mt={2}>
                <Controller
                    name="newSupport"
                    control={control}
                    render={({ field }) =>
                        <SupportSelector
                            {...field}
                            value={newSupportValue}
                            onChange={handleNewSupportChange}
                            size="small"
                        />
                    }
                />
            </Stack> : null}

            <Stack mt={2}>
                <Controller
                    name="clothing_type"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="Type de vêtement"
                            variant="outlined"
                            error={errors?.name?.message ? true : false}
                            helperText={errors?.name?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack mt={2}>
                <Controller
                    name="silhouette"
                    control={control}
                    render={({ field }) =>
                        <TextField
                            size="small"
                            type="text"
                            label="silhouette"
                            variant="outlined"
                            error={errors?.name?.message ? true : false}
                            helperText={errors?.name?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <Stack sx={{ mt: 2, '& > legend': { mt: 0 } }} flexDirection='row' alignItems="center">

                <Typography sx={{ mr: 1 }} component="legend">Note</Typography>
                <FormControlLabel
                    control={
                        <Rating
                            name="rating"
                            precision={0.5}
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
                            error={errors?.comment?.message ? true : false}
                            helperText={errors?.comment?.message}
                            fullWidth
                            {...field}
                        />}
                />
            </Stack>

            <input type="hidden" value={Number(userId)} {...register("user_id")} />

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
                    variant="contained"
                    loading={loading}
                >
                    Valider
                </LoadingButton>
            </Stack>

        </Box>
    )
}
export default PatternForm