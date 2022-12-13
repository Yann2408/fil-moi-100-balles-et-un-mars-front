import { Button, Link, SelectChangeEvent, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import useSWR from "swr"
import NormalCard from "../../components/atoms/card"
import Loader from "../../components/atoms/loader"
import TissuSelector from "../../components/molecules/selector/tissu-selector"
import TissuTypeSelector from "../../components/molecules/selector/tissu-type-selector"
import Navbar from "../../components/organisms/navbar"
import endpoints from "../../endpoints"
import useApi from "../../hooks/api"
import ITissuType from "../../interfaces/tissus-type.interface"
import ITissu from "../../interfaces/tissus.interface"


const TissusList: NextPage = () => {

    const { fetcher } = useApi()

    const tissus = [
        {
            id: 1,
            name: "tissu 1",
            material: "blabla",
            weight: 2,
            laize: 2,
            price: 2,
            stock: 2,
            by_on: "blabla",
            scrap: true,
            pre_wash: true,
            oekotex: true,
            bio: true,
            rating: 2,
            comment: "blabla"
        },
        {
            id: 2,
            name: "tissu 2",
            material: "blabla",
            weight: 2,
            laize: 2,
            price: 2,
            stock: 0,
            by_on: "blabla",
            scrap: true,
            pre_wash: true,
            oekotex: true,
            bio: true,
            rating: 2,
            comment: "blabla"
        },
        {
            id: 3,
            name: "tissu 3",
            material: "blabla",
            weight: 2,
            laize: 2,
            price: 2,
            stock: 2,
            by_on: "blabla",
            scrap: true,
            pre_wash: true,
            oekotex: true,
            bio: true,
            rating: 2,
            comment: "blabla"
        }]

    // const { data: tissus } = useSWR<ITissu[]>({
    //     url: endpoints.tissus.all,
    //     args: {
    //     }
    // }, fetcher)

    const [tissuValue, setTissuValue] = useState<string | undefined>('')

    const [selectedTissu, setSelectedTissu] = useState<ITissu[]>([])

    const handleTissuChange = (event: SelectChangeEvent) => {
        setTissuValue(event.target.value);
    };

    useEffect(() => {
        if (tissus && tissuValue !== '') {
            const selectedTissu = tissus.filter((tissu) => tissu.name === tissuValue)
            setSelectedTissu(selectedTissu)
        } else {
            setSelectedTissu(tissus)
        }
    }, [tissuValue])

    return (

        <Container>

            <Navbar />
            <Stack flexDirection={"row"} justifyContent={"space-around"} sx={{ mb: 2 }}>
                <Typography variant="h4">Mes tissus</Typography>
                <Button href='/tissus/create' variant="outlined" size="small">Ajouter un tissu</Button>
            </Stack>

            <Stack justifyContent={"center"} sx={{ mb: 2 }}>
                <TissuSelector
                    value={tissuValue}
                    onChange={handleTissuChange}
                />
            </Stack>

            <Stack justifyContent={"center"} >
                <TissuTypeSelector />
            </Stack>


            {selectedTissu.map(function (tissu) {
                return (
                    <NormalCard>
                        <Stack>
                            <Typography>{tissu.name}</Typography>
                            {tissu.stock > 0 ? <Typography color="success.main"> En stock</Typography > : <Typography color="error.main"> Epuisé</Typography>}
                        </Stack>
                    </NormalCard>
                )
            })}

        </Container>
    )
}

export default TissusList