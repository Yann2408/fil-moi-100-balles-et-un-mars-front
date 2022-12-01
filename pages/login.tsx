import { Box, Typography } from "@mui/material"
import FormLogin from "../components/organisms/form/form-login"


const Login = (): JSX.Element => {
    
    return(
        <Box sx={{marginTop: 8, marginLeft: "auto", marginRight: "auto", width: "80%"}}>
            <Typography component="h1" variant="h4" sx={{marginBottom: 4}}>
          Fil moi 100 balles et un mars
        </Typography>
            <FormLogin />
        </Box>
    )
}

export default Login