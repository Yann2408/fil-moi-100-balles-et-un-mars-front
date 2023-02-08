import { Button, Container, Grid, Rating, SelectChangeEvent, Stack, Typography } from "@mui/material"
import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import NormalCard from "../../components/atoms/card"
import Loader from "../../components/atoms/loader"
import ClothingTypeSelector from "../../components/molecules/selector/patterns/clothing-type-selector"
import PatternSelector from "../../components/molecules/selector/patterns/pattern-selector"
import Navbar from "../../components/organisms/navbar"
import endpoints from "../../endpoints"
import useApi from "../../hooks/api"
import IPattern from "../../interfaces/pattern-interface"


const PatternsList: NextPage = () => {

    const { fetcher } = useApi()

    const [patternValue, setPatternValue] = useState<string | undefined>('')
    const [clothingTypeValue, setclothingTypeValue] = useState<string | undefined>('')

    const [clothingType, setClothingType] = useState<string[]>([])

    const [selectedPattern, setSelectedPattern] = useState<IPattern[] | undefined>([])

    const { data: patterns } = useSWR<IPattern[]>({
        url: endpoints.patterns.all,
        args: {
        }
    }, fetcher)

    useEffect(() => {

        if (patterns) {
            const clothingType: string[] = []
            patterns.map((pattern) => {
                if (!clothingType.includes(pattern.clothing_type)) {
                    clothingType.push(pattern.clothing_type)
                }
            })
            setClothingType(clothingType)
        }
    }, [patterns])

    useEffect(() => {
        if (patterns && clothingTypeValue !== undefined) {

            if (clothingTypeValue.length > 0) {
                const clothingTypeSelection = patterns.filter((pattern) => clothingTypeValue.includes(pattern.clothing_type))
                if (patternValue !== '') {
                    const selectedPattern = clothingTypeSelection.filter((pattern) => pattern.name === patternValue)
                    setSelectedPattern(selectedPattern)
                } else {
                    setSelectedPattern(clothingTypeSelection)
                }
            } else if (patternValue !== '') {
                const selectedPattern = patterns.filter((pattern) => pattern.name === patternValue)
                setSelectedPattern(selectedPattern)
            } else {
                setSelectedPattern(patterns)
            }
        }
    }, [patternValue, patterns, clothingTypeValue])

    const handlePatternChange = (event: SelectChangeEvent) => {
        setPatternValue(event.target.value);
    };

    const handleClothingTypeChange = (event: SelectChangeEvent) => {
        setclothingTypeValue(event.target.value);
    };

    return (patterns ?

        <Container>

            <Navbar />
            <Stack flexDirection={"row"} justifyContent={"space-around"} sx={{ mb: 2 }}>
                <Typography variant="h4">Mes Patrons</Typography>
                <Button href='/patterns/create' variant="outlined" size="small">Ajouter un patron</Button>
            </Stack>

            <Grid container spacing={{ xs: 1, sm: 2 }}>

                <Grid item xs={12} sm={6}>

                    <Stack justifyContent={"center"} sx={{ mb: 2 }}>
                        <PatternSelector
                            patternValue={patternValue}
                            onChange={handlePatternChange}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Stack justifyContent={"center"} >
                        <ClothingTypeSelector
                            clothingTypeValue={clothingTypeValue}
                            clothingTypes={clothingType}
                            onChange={handleClothingTypeChange}
                        />
                    </Stack>
                </Grid>

                {selectedPattern ? selectedPattern.map(function (pattern) {
                    return (
                        <Grid item xs={12} md={6} lg={4}>
                            <Link href={{ pathname: '/patterns/[id]', query: { id: pattern.id.toString() } }} passHref>
                                <NormalCard>
                                    <Stack sx={{ width: '100%', pt: 1 }}  flexDirection='column'>
                                        <Stack sx={{ width: '100%' }}  alignItems='flex-end'>
                                            <Rating size="small" readOnly precision={0.5} value={pattern.rating} />
                                        </Stack>
                                        <Stack sx={{ width: '100%', mt: 1 }}  alignItems='center'>
                                            <Typography variant="h6">{pattern.name}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: '100%', pt: 1 }} >
                                            <Typography>{pattern.clothing_type}</Typography>  
                                        </Stack>
                                    </Stack>
                                </NormalCard>
                            </Link>
                        </Grid>
                    )
                }) : "Aucun patron à afficher"}

            </Grid>

        </Container> : <Loader />
    )
}
export default PatternsList