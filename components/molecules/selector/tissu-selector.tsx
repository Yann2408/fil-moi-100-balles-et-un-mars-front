import { Autocomplete, Box, FormControl, TextField, TextFieldProps } from '@mui/material';
import React, { ForwardedRef, forwardRef } from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissu from '../../../interfaces/tissus.interface';

const TissuSelector = (props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {


  const { fetcher } = useApi()

  const { label, fullWidth = false, value } = props
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

  return tissus ? <FormControl sx={fullWidth ? { width: '100%' } : { minWidth: 300 }}
  >
    <Autocomplete
      size="small"
      ref={ref}
      onChange={(event: React.SyntheticEvent<Element, Event>, newValue: any) => {
        (props?.onChange && newValue) && props?.onChange(newValue);
      }}
      defaultValue={value as ITissu}
      id="tissu-types-selector"
      options={tissus}
      autoHighlight
      disabled={props.disabled}
      getOptionLabel={(option: any) => option.name ? option.name : ''}
      renderOption={(props, option: any) => (
        <Box component="li" {...props}>
          <span style={{ marginLeft: 10 }}>{option.name}</span>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          {...params}
          label={"Rechercher un tissu"}
          inputProps={{
            ...params.inputProps,
          }}
          {...props}
        />
      )}
    />
  </FormControl> : <></>

}
export default forwardRef(TissuSelector)