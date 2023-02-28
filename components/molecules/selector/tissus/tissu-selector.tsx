import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { ReactNode } from 'react';
import useSWR from 'swr';
import endpoints from '../../../../endpoints';
import useApi from '../../../../hooks/api';
import ITissu from '../../../../interfaces/tissus.interface';

interface TissuSelectorProps {
  tissuValue: string | undefined
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const TissuSelector = (props: TissuSelectorProps,): JSX.Element => {

  const { fetcher } = useApi()

  const { tissuValue, onChange } = props

  const { data: tissus } = useSWR<ITissu[]>({
    url: endpoints.tissus.all,
    args: {}
  }, fetcher)

  return tissus ? <FormControl sx={{ width: '100%' }} size="small"
  >
    <InputLabel id="tissu-selector">Rechercher un tissu</InputLabel>

    <Select
      labelId="tissu-selector"
      id="tissu-selector"
      value={tissuValue}
      label="Rechercher un tissu"
      onChange={onChange}
    >
      <MenuItem value={''}></MenuItem>
      {tissus.map((tissu) => {
        return (
          <MenuItem value={tissu.name}>{tissu.name}</MenuItem>
        )
      })}

    </Select>

  </FormControl> : <></>

}
export default TissuSelector