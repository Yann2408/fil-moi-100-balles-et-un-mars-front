import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { forwardRef, ReactNode } from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissu from '../../../interfaces/tissus.interface';

interface TissuSelectorProps {
  value: string | undefined
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}


// const TissuSelector = (props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
const TissuSelector = (props: TissuSelectorProps,): JSX.Element => {


  const { fetcher } = useApi()

  const { value, onChange } = props
  // const { data: tissu } = useSWR<ITissuType[]>({
  //   url: endpoints.tissuTypes.all,
  //   args: {}
  // }, fetcher)

  const tissus: ITissu[] = [
    {
      id: 1,
      name: "tissu 1",
      material: "blabla",
      weight: 2,
      laize: 2,
      price: 2,
      stock: 2,
      by_on: "blabla",
      scrap: true,
      pre_wash: true,
      oekotex: true,
      bio: true,
      rating: 2,
      comment: "blabla"
    },
    {
      id: 2,
      name: "tissu 2",
      material: "blabla",
      weight: 2,
      laize: 2,
      price: 2,
      stock: 2,
      by_on: "blabla",
      scrap: true,
      pre_wash: true,
      oekotex: true,
      bio: true,
      rating: 2,
      comment: "blabla"
    },
    {
      id: 3,
      name: "tissu 3",
      material: "blabla",
      weight: 2,
      laize: 2,
      price: 2,
      stock: 2,
      by_on: "blabla",
      scrap: true,
      pre_wash: true,
      oekotex: true,
      bio: true,
      rating: 2,
      comment: "blabla"
    }
  ]

  return tissus ? <FormControl sx={{ width: '100%' }} size="small"
  >
    <InputLabel id="tissu-selector">Rechercher un tissu</InputLabel>

    <Select
      labelId="tissu-selector"
      id="tissu-selector"
      value={value}
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
export default forwardRef(TissuSelector)