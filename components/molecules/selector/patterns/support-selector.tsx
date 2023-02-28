import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { ReactNode } from "react"
import useSWR from "swr"
import endpoints from "../../../../endpoints"
import useApi from "../../../../hooks/api"

interface SupportSelectorProps {
    value: string | undefined
    size: "small" | "medium" | undefined
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const SupportSelector = (props: SupportSelectorProps,): JSX.Element => {

    const { fetcher } = useApi()

    const { value, onChange, size } = props

    const supports = ["pdf", "pochette", "magazine"]

    return <FormControl sx={{ width: '100%' }} size={size}>

        <InputLabel id="tissu-selector">Séléctionner un support</InputLabel>

        <Select
            labelId="support-selector"
            id="support-selector"
            value={value}
            label="Séléctionner un support"
            onChange={onChange}
        >
            <MenuItem value={''}></MenuItem>
            {supports.map((support) => {
                return (
                    <MenuItem value={support}>{support}</MenuItem>
                )
            })}

        </Select>

    </FormControl>
}
export default SupportSelector