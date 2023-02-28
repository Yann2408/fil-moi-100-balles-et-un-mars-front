import { Box, Card, Container, Stack, Typography } from '@mui/material'

import Head from 'next/head'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Navbar from '../../components/organisms/navbar'
import PatternForm from '../../components/molecules/form/pattern-form'

const PatternsStore: NextPage = () => {

    const router = useRouter()

    const { patternId } = router.query
    const isId = Number.isInteger(Number(patternId)) && Number(patternId) > 0

    return (

        <Container>
            <Navbar />
            <Head>
                <title>Patron</title>
            </Head>
            <Stack spacing={2}>
                <Card>
                    <Box padding={{ xs: 1, sm: 3, md: 5 }}>
                        <Typography component="h3" variant="h3" padding={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                            {isId === false ? "Nouveau patron" : "Mettre à jour"}
                        </Typography>
                        <PatternForm key={JSON.stringify(patternId)} id={isId ? Number(patternId) : undefined} />
                    </Box>
                </Card>
            </Stack>
        </Container>
    )
}
export default PatternsStore