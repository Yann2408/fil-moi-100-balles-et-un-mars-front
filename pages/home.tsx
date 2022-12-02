import { Typography } from "@mui/material"
import { NextPage } from "next"
import Navbar from "../components/organisms/navbar"

const home: NextPage = () => {
    return(
        <Navbar>
             <Typography>
                "hello world"
             </Typography>
         </Navbar>
    )
}

export default home