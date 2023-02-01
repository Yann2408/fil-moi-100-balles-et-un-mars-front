import { Box, Rating, Typography } from '@mui/material';
import * as React from 'react';

interface RatingProps {
    ratingValue: number | null
}

const RatingSelector = (props: RatingProps,): JSX.Element => {

    const { ratingValue } = props

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Read only</Typography>
            <Rating name="read-only" value={ratingValue} readOnly />
        </Box>
    )
}
export default RatingSelector