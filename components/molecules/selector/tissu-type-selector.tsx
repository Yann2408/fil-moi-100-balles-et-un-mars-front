import { Autocomplete, Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, TextFieldProps } from '@mui/material';
import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import useSWR from 'swr';
import endpoints from '../../../endpoints';
import useApi from '../../../hooks/api';
import ITissuType from '../../../interfaces/tissus-type.interface';

interface TissuTypeSelectorProps {
  value: string[] | undefined
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

const TissuTypeSelector = (props: TissuTypeSelectorProps,): JSX.Element => {


  const { fetcher } = useApi()

  const { value, onChange } = props

  const { data: tissuTypes } = useSWR<ITissuType[]>({
    url: endpoints.tissuTypes.all,
    args: {}
  }, fetcher)

  // const tissuTypes : ITissuType[] = [
  //   {name:  "jean"},
  //   {name: "coton"},
  //   {name: "velour"}
  // ]

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









    {/* <Autocomplete 
      multiple
      limitTags={2}
      size="small"
      value={value}

    /> */}


    {/* <Autocomplete
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
    /> */}
  </FormControl> : <></>

}
export default TissuTypeSelector