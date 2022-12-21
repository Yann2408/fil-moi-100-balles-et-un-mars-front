import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissuType from '../../../interfaces/tissus-type.interface';

interface TissuTypeSelectorProps {
    value: string | undefined
    size: "small" | "medium" | undefined
    onChange: (event: SelectChangeEvent) => void
}

const TissuTypeSelector = (props: TissuTypeSelectorProps,): JSX.Element => {

    const { fetcher } = useApi()

    const { value, onChange, size } = props

    const [choices, setChoices] = useState<string[]>([])

    const { data: tissuTypes } = useSWR<ITissuType[]>({
        url: endpoints.tissuTypes.all,
        args: {}
    }, fetcher)

    useEffect(() => {
        if (tissuTypes) {
            const tissusNames = tissuTypes.map((tissuType) => {
                return (
                    tissuType.name
                )
            })
            setChoices(tissusNames)
        }

    }, [tissuTypes])

    return (tissuTypes ?

        <FormControl fullWidth size={size}>
            <InputLabel id="Type-de-tissu-label">Type de tissu</InputLabel>
            <Select
                labelId="Type-de-tissu-label"
                id="Type-de-tissu-select"
                value={value}
                label="Type de tissu"
                onChange={onChange}

            >
                {choices.map((choice) => (
                    <MenuItem
                        key={choice}
                        value={choice}
                    >
                        {choice}
                    </MenuItem>
                ))}
            </Select>
        </FormControl> : <></>
    )
}

export default TissuTypeSelector