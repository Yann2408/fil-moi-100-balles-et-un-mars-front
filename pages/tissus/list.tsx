import { Button, SelectChangeEvent, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"
import NormalCard from "../../components/atoms/card"
import Loader from "../../components/atoms/loader"
import TissuSelector from "../../components/molecules/selector/tissu-selector"
import TissuTypeSelector from "../../components/molecules/selector/tissu-type-selector"
import Navbar from "../../components/organisms/navbar"
import endpoints from "../../endpoints"
import useApi from "../../hooks/api"
import ITissu from "../../interfaces/tissus.interface"


const TissusList: NextPage = () => {

    const { fetcher } = useApi()

    const [tissuValue, setTissuValue] = useState<string | undefined>('')
    const [selectedTissu, setSelectedTissu] = useState<ITissu[] | undefined>([])

    const [tissuTypesValue, setTissuTypesValue] = useState<string[] | undefined>([]);

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
                }else {
                    setSelectedTissu(tissuTypeSelection)
                }
                }
            else if (tissuValue !== '') {
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

    const handleTyssuTypeChange = (event: SelectChangeEvent<typeof tissuTypesValue>) => {
        const {
            target: { value },
        } = event;
        setTissuTypesValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (

        tissus ? 

        <Container>

            <Navbar />
            <Stack flexDirection={"row"} justifyContent={"space-around"} sx={{ mb: 2 }}>
                <Typography variant="h4">Mes tissus</Typography>
                <Button href='/tissus/create' variant="outlined" size="small">Ajouter un tissu</Button>
            </Stack>

            <Stack justifyContent={"center"} sx={{ mb: 2 }}>
                <TissuSelector
                    tissuValue={tissuValue}
                    onChange={handleTissuChange}
                />
            </Stack>

            <Stack justifyContent={"center"} >
                <TissuTypeSelector
                    value={tissuTypesValue}
                    onChange={handleTyssuTypeChange}
                />
            </Stack>


            {selectedTissu ? selectedTissu.map(function (tissu) {
                return (
                    <NormalCard>
                        <Stack>
                            <Typography>{tissu.name}</Typography>
                            <Typography>{tissu.tissu_type.name}</Typography>
                            {tissu.stock > 0 ? <Typography color="success.main"> En stock</Typography > : <Typography color="error.main"> Epuisé</Typography>}
                        </Stack>
                    </NormalCard>
                )
            }) : null}

        </Container> : <Loader/>
    )
}

export default TissusList