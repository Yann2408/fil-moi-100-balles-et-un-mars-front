import { Card, CardContent, CardMedia, CardActions, Button, Stack, IconButton, Box, styled } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


const CardContentNoPadding = styled(CardContent)`
backgroundColor: 'purple'
  padding: 0;
  &:last-child {
    padding: 0;
  }
`

interface NormalCardProps {
    children: JSX.Element
    clickable?: boolean
    onClick?: () => void
}

const NormalCard = (props: NormalCardProps): JSX.Element => {

    const { children, clickable = false, onClick } = props

    return (
        <Card sx={{mt: 3}}>
            <CardContentNoPadding >
                <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia
                        component='img'
                        height='100'
                        sx={{ width: '45%' }}
                        image='https://source.unsplash.com/random'
                        alt="tissu picture"
                    />
                    <Stack sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                        <Stack alignItems="center">
                            {children}
                        </Stack>
                        {/* <Stack alignItems="flex-end" bgcolor={"blue"} width="100%" ml={1}> */}
                        <Stack alignItems="flex-end"  width="100%" ml={1}>
                            <Stack sx={{ display: 'flex', flexDirection: 'row' }} justifyContent="space-between">
                                <Stack>Rating</Stack>
                                <Stack>
                                <IconButton >
                                    <DeleteIcon fontSize="medium" />
                                </IconButton>

                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                </Stack>
            </CardContentNoPadding>
        </Card>

    //     <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     bgcolor: 'background.paper',
    //     overflow: 'hidden',
    //     borderRadius: '12px',
    //     boxShadow: 1,
    //     fontWeight: 'bold',
    //   }}
    // >
    //   <Box
    //     component="img"
    //     sx={{
    //       height: 150,
    //       width: '50%',
    //     //   maxHeight: { xs: 233, md: 167 },
    //     //   maxWidth: { xs: 350, md: 250 },
    //     }}
    //     alt="The house from the offer."
    //     src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
    //   />
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: { xs: 'center', md: 'flex-start' },
    //       m: 3,
    //       minWidth: { md: 350 },
    //     }}
    //   >
    //     <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
    //       123 Main St, Phoenix AZ
    //     </Box>
    //     <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
    //       $280,000 — $310,000
    //     </Box>
    //     <Box
    //       sx={{
    //         mt: 1.5,
    //         p: 0.5,
    //         // backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
    //         borderRadius: '5px',
    //         color: 'primary.main',
    //         fontWeight: 'medium',
    //         display: 'flex',
    //         fontSize: 12,
    //         alignItems: 'center',
    //         '& svg': {
    //           fontSize: 21,
    //           mr: 0.5,
    //         },
    //       }}
    //     >
    //       {/* <ErrorOutlineIcon /> */}
    //       CONFIDENCE SCORE 85%
    //     </Box>
    //   </Box>
    // </Box>

        
    )
}

export default NormalCard