import { Card, CardContent, CardMedia, Grid} from "@mui/material"

interface NormalCardProps {
    children: JSX.Element
    clickable?: boolean
    onClick? : () => void
  }

const NormalCard = (props: NormalCardProps): JSX.Element => {

    const { children, clickable = false, onClick } = props

    return (
            <Card>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }} >             
                    <CardMedia 
                        component='img'
                        height='150'
                        sx={{width: '50%' }}
                        image='https://source.unsplash.com/random'
                        alt="tissu picture"                  
                    />
                    {children}               
                </CardContent>
            </Card>
    )
}

export default NormalCard