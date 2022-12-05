import { Button, Link, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { NextPage } from "next"
import useSWR from "swr"
import NormalCard from "../../components/atoms/card"
import Navbar from "../../components/organisms/navbar"
import endpoints from "../../endpoints"
import useApi from "../../hooks/api"
import ITissu from "../../interfaces/tissus.interface"


const TissusList: NextPage = () => {

    const { fetcher } = useApi()

    const { data: tissus } = useSWR<ITissu[]>({
        url: endpoints.tissus.all,
        args: {
        }
    }, fetcher)

    console.log(tissus)

    return (

        <Container>

            <Navbar />
            <Stack flexDirection={"row"} justifyContent={"space-around"}>
                <Typography variant="h4">Mes tissus</Typography>
                <Button href='/tissus/create' variant="outlined" size="small">Ajouter un tissu</Button>
            </Stack>
                <NormalCard> 
                    <Typography>blabla</Typography>
                    </NormalCard>

        </Container>

    )
}

export default TissusList