import { Button, Grid, Rating, SelectChangeEvent, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"
import NormalCard from "../../components/atoms/card"
import Loader from "../../components/atoms/loader"
import Link from 'next/link'
import TissuSelector from "../../components/molecules/selector/tissus/tissu-selector"
import Navbar from "../../components/organisms/navbar"
import endpoints from "../../endpoints"
import useApi from "../../hooks/api"
import ITissu from "../../interfaces/tissus.interface"
import MultiTissuTypeSelector from "../../components/molecules/selector/tissus/multi-tissu-type-selector"

const TissusList: NextPage = () => {

    const { fetcher } = useApi()

    const [tissuValue, setTissuValue] = useState<string | undefined>('')
    const [tissuTypesValue, setTissuTypesValue] = useState<string[] | undefined>([]);

    const [selectedTissu, setSelectedTissu] = useState<ITissu[] | undefined>([])

    const { data: tissus } = useSWR<ITissu[]>({
        url: endpoints.tissus.all,
        args: {
        }
    }, fetcher)

    useEffect(() => {
        if (tissus && tissuTypesValue !== undefined) {

            if (tissuTypesValue.length > 0) {
                const tissuTypeSelection = tissus.filter((tissu) => tissuTypesValue.includes(tissu.tissu_type.name))
                if (tissuValue !== '') {
                    const selectedTissu = tissuTypeSelection.filter((tissu) => tissu.name === tissuValue)
                    setSelectedTissu(selectedTissu)
                } else {
                    setSelectedTissu(tissuTypeSelection)
                }
            } else if (tissuValue !== '') {
                const selectedTissu = tissus.filter((tissu) => tissu.name === tissuValue)
                setSelectedTissu(selectedTissu)
            } else {
                setSelectedTissu(tissus)
            }
        }
    }, [tissuValue, tissus, tissuTypesValue])

    const handleTissuChange = (event: SelectChangeEvent) => {
        setTissuValue(event.target.value);
    };

    const handleTissuTypeChange = (event: SelectChangeEvent<typeof tissuTypesValue>) => {
        const {
            target: { value },
        } = event;
        setTissuTypesValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (tissus ?

        <Container>

            <Navbar />

            <Stack flexDirection={"row"} justifyContent={"space-around"} sx={{ mb: 2 }}>
                <Typography variant="h4">Mes tissus</Typography>
                <Button href='/tissus/create' variant="outlined" size="small">Ajouter un tissu</Button>
            </Stack>

            <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Stack justifyContent={"center"} sx={{ mb: 2 }}>
                        <TissuSelector
                            tissuValue={tissuValue}
                            onChange={handleTissuChange}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack justifyContent={"center"} >
                        <MultiTissuTypeSelector
                            value={tissuTypesValue}
                            onChange={handleTissuTypeChange}
                        />
                    </Stack>
                </Grid>

                {selectedTissu ? selectedTissu.map(function (tissu) {
                    return (
                        <Grid item xs={12} md={6} lg={4}>
                            <Link href={{ pathname: '/tissus/[id]', query: { id: tissu.id.toString() } }} passHref>
                                <NormalCard>
                                    <Stack sx={{ width: '100%', pt: 1 }} flexDirection='column'>
                                        <Stack sx={{ width: '100%' }} alignItems='flex-end'>
                                            <Rating size="small" readOnly precision={0.5} value={tissu.rating} />
                                        </Stack>
                                        <Stack sx={{ width: '100%', mt: 1 }} alignItems='center'>
                                            <Typography variant="h6">{tissu.name}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: '100%', pt: 1 }} flexDirection='row' justifyContent='space-around'>
                                            <Typography>{tissu.tissu_type.name}</Typography>
                                            {tissu.stock > 0 ? <Typography color="success.main"> stock: {tissu.stock} m</Typography > : <Typography color="error.main"> Epuisé</Typography>}
                                        </Stack>
                                    </Stack>
                                </NormalCard>
                            </Link>
                        </Grid>
                    )
                }) : "Aucun tissu à afficher"}

            </Grid>
        </Container> : <Loader />
    )
}
export default TissusList