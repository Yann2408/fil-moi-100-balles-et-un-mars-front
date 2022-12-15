import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissuType from '../../../interfaces/tissus-type.interface';

interface TissuTypeSelectorProps {
    value: string | undefined
    size : "small" | "medium" | undefined
    onChange: (event: SelectChangeEvent) => void
}

const TissuTypeSelector = (props: TissuTypeSelectorProps,): JSX.Element => {

    const { fetcher } = useApi()

    const { value, onChange, size } = props

    const { data: tissuTypes } = useSWR<ITissuType[]>({
        url: endpoints.tissuTypes.all,
        args: {}
    }, fetcher)

    return ( tissuTypes ?

        <FormControl fullWidth size={size}>
            <InputLabel id="Type-de-tissu-label">Type de tissu</InputLabel>
            <Select
                labelId="Type-de-tissu-label"
                id="Type-de-tissu-select"
                value={value}
                label="Type de tissu"
                onChange={onChange}
                
            >
                {tissuTypes.map((tissuType) => (
                    <MenuItem
                        key={tissuType.name}
                        value={tissuType.name}
                    >
                        {tissuType.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl> : <></>
    )
}

export default TissuTypeSelector