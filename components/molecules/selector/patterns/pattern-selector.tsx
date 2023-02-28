import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { ReactNode } from "react"
import useSWR from "swr"
import endpoints from "../../../../endpoints"
import useApi from "../../../../hooks/api"
import IPattern from "../../../../interfaces/pattern-interface"


interface PatternSelectorProps {
    patternValue: string | undefined
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const PatternSelector = (props: PatternSelectorProps,): JSX.Element => {

    const { fetcher } = useApi()

    const { patternValue, onChange } = props

    const { data: patterns } = useSWR<IPattern[]>({
        url: endpoints.patterns.all,
        args: {}
    }, fetcher)

    return patterns ? <FormControl sx={{ width: '100%' }} size="small">

        <InputLabel id="tissu-selector">Rechercher un patron</InputLabel>

        <Select
            labelId="pattern-selector"
            id="pattern-selector"
            value={patternValue}
            label="Rechercher un patron"
            onChange={onChange}
        >
            <MenuItem value={''}></MenuItem>
            {patterns.map((pattern) => {
                return (
                    <MenuItem value={pattern.name}>{pattern.name}</MenuItem>
                )
            })}

        </Select>

    </FormControl> : <></>
}
export default PatternSelector