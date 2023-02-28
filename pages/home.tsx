import { Box, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { NextPage } from "next"
import Navbar from "../components/organisms/navbar"

const home: NextPage = () => {
    return(
        <Container>
            <Navbar />
            <Typography>Work in progress</Typography>
        </Container>
    )
}

export default home