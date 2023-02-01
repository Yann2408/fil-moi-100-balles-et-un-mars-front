import { Box, Card, Container, Stack, Typography } from '@mui/material'

import Head from 'next/head'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Navbar from '../../components/organisms/navbar'
import TissuForm from '../../components/molecules/form/tissu-form'
import { useEffect, useState } from 'react'
import { boolean } from 'yup'
const AdvertisersStore: NextPage = () => {

    const router = useRouter()

    const { tissuId } = router.query
    const isId = Number.isInteger(Number(tissuId)) && Number(tissuId) > 0

    return (

        <Container>
            <Navbar />
            <Head>
                <title>Tissu</title>
            </Head>
            <Stack spacing={2}>
                <Card>
                    <Box padding={{ xs: 1, sm: 3, md: 5 }}>
                        <Typography component="h3" variant="h3" padding={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                            {isId === false ? "Nouveau tissu" : "Mettre à jour"}
                        </Typography>
                        <TissuForm key={JSON.stringify(tissuId)} id={isId ? Number(tissuId) : undefined} />
                    </Box>
                </Card>
            </Stack>
        </Container>
    )
}

export default AdvertisersStore