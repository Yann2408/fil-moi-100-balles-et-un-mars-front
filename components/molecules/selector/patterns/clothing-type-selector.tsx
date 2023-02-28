import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { ReactNode } from "react"
import useApi from "../../../../hooks/api"


interface ClothingTypeSelectorProps {
    clothingTypeValue: string | undefined
    clothingTypes: string[]
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const ClothingTypeSelector = (props: ClothingTypeSelectorProps,): JSX.Element => {

    const { fetcher } = useApi()

    const { clothingTypeValue,clothingTypes, onChange } = props

    return <FormControl sx={{ width: '100%' }} size="small">

        <InputLabel id="tissu-selector">Rechercher un type de vetement</InputLabel>

        <Select
            labelId="clothingTypes-selector"
            id="clothingTypes-selector"
            value={clothingTypeValue}
            label="Rechercher un type de vetement"
            onChange={onChange}
        >
            <MenuItem value={''}></MenuItem>
            {clothingTypes.map((clothingType) => {
                return (
                    <MenuItem value={clothingType}>{clothingType}</MenuItem>
                )
            })}

        </Select>

    </FormControl>
}
export default ClothingTypeSelector