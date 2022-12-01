import { Box, CircularProgress } from "@mui/material"

const Loader = (): JSX.Element => {

  return <Box sx={{ display: 'flex', minHeight: '100vh' }} justifyContent="center" alignItems="center">
    <CircularProgress />
  </Box>

}

export default Loader