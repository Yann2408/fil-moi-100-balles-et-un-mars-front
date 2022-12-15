import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissuType from '../../../interfaces/tissus-type.interface';

interface MultiTissuTypeSelectorProps {
  value: string[] |undefined
  onChange: (event: SelectChangeEvent<string[] | undefined>) => void
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiTissuTypeSelector = (props: MultiTissuTypeSelectorProps,): JSX.Element => {


  const { fetcher } = useApi()

  const { value, onChange } = props

  const { data: tissuTypes } = useSWR<ITissuType[]>({
    url: endpoints.tissuTypes.all,
    args: {}
  }, fetcher)

  return tissuTypes ? <FormControl sx={{ width: '100%' }} size="small"
  >

    <InputLabel id="tissu-selector">Trier par matière</InputLabel>

    <Select
      labelId="tissu-type-selector"
      id="tissu-type-selector"
      multiple
      value={value}
      onChange={onChange}
      input={<OutlinedInput id="tissu-type-selector-multiple-chip" label="Trier par matière" />}
      renderValue={(tissuTypes) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {tissuTypes.map((tissuType) => (
            <Chip key={tissuType} label={tissuType} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
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

}
export default MultiTissuTypeSelector