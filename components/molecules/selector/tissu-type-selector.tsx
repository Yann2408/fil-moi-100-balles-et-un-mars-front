import { Autocomplete, Box, FormControl, TextField, TextFieldProps } from '@mui/material';
import React, { ForwardedRef, forwardRef } from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissuType from '../../../interfaces/tissus-type.interface';

const TissuTypeSelector = (props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {


  const { fetcher } = useApi()

  const { label, fullWidth = false, value } = props
  // const { data: tissuTypes } = useSWR<ITissuType[]>({
  //   url: endpoints.tissuTypes.all,
  //   args: {}
  // }, fetcher)

  const tissuTypes : ITissuType[] = [
    {name:  "jean"},
    {name: "coton"},
    {name: "velour"}
  ]

  return tissuTypes ? <FormControl sx={fullWidth ? { width: '100%' } : { minWidth: 300 }}
  >
    <Autocomplete
      multiple
      limitTags={2}
      size="small"
      ref={ref}
      onChange={(event: React.SyntheticEvent<Element, Event>, newValue: any) => {
        (props?.onChange && newValue) && props?.onChange(newValue);
      }}
      // defaultValue={value as ITissuType}
      defaultValue={[]}
      id="tissu-types-selector"
      options={tissuTypes}
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
          label={"Type de tissu"}
          inputProps={{
            ...params.inputProps,
          }}
          {...props}
        />
      )}
    />
  </FormControl> : <></>

}
export default forwardRef(TissuTypeSelector)