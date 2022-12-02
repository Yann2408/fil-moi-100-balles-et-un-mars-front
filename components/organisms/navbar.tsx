import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack } from "@mui/system";
import React, { ReactNode, useState } from "react";

interface NavbarProps {
    children: ReactNode
    maxWidth?: false | undefined
}

const Navbar = (props: NavbarProps) => {

    const { children, maxWidth = 'lg' } = props

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">

                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                        <AdfScannerIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack direction="row" spacing={2}>
                        <Button
                            id="menu-button"
                            color="inherit"
                            onClick={handleClick}
                            aria-control={open ? 'menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Menu
                        </Button>
                        <Button color="inherit">Mon Compte</Button>
                        <Button color="inherit">Logout</Button>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            open={open}
                            MenuListProps={{ 'aria-labelledby': 'menu-button' }}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <Link href="/login" style={{ textDecoration: "none" }}>
                                    <Typography color="black">Tissus</Typography>
                                </Link>
                            </MenuItem>
                            <Link href="/login" style={{ textDecoration: "none" }}>
                                <MenuItem color="inherit">Patrons</MenuItem>
                            </Link>
                            <MenuItem>Projets</MenuItem>
                            <MenuItem>Inspirations</MenuItem>
                            <MenuItem>To-buy-list</MenuItem>
                            <MenuItem>Mensurations</MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>

            </AppBar>
            <Box component="main" sx={{ flexGrow: 1 }} padding={{ xs: 1, sm: 2 }}>
                <Container maxWidth={maxWidth}>
                    {children}
                </Container>
            </Box>
        </Box>
    )
}

export default Navbar