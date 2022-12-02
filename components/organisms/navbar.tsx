import { AppBar, Box, Button, Container, Drawer, IconButton, Link, Menu, MenuItem, Toolbar, Typography, List, ListItemText, ListItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack } from "@mui/system";
import React, { ReactNode, useState } from "react";

// interface NavbarProps {
//     children: ReactNode
//     maxWidth?: false | undefined
// }


const Navbar = () => {
// const Navbar = (props: NavbarProps) => {

    // const { children, maxWidth = 'lg' } = props

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const menuDrawer = [
        {
            titre: "Projets",
            link: '/projects'
        },
        {
            titre: "Tissus",
            link: '/tissus'
        },
        {
            titre: "Pattrons",
            link: '/patterns'
        },
        {
            titre: "Inspirations",
            link: '/inspirations'
        },
        {
            titre: "To-Buy-List",
            link: '/to-buy-list'
        },
        {
            titre: "Mensurations",
            link: '/measurements'
        },
        {
            titre: "Répertoire",
            link: '/repository'
        },
    ]

    return (
        <Box sx={{ display: 'flex' }} marginBottom={10}>
            <AppBar position="fixed">

                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='drawer'
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack direction="row" spacing={2}>
                        <Button
                            id="menu-mon-compte-button"
                            color="inherit"
                            onClick={handleClick}
                            aria-control={open ? 'menu-mon-compte' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Mon Compte
                        </Button>
                        <Menu
                            id="menu-mon-compte"
                            anchorEl={anchorEl}
                            open={open}
                            MenuListProps={{ 'aria-labelledby': 'menu-mon-compte-button' }}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <Link href="/login" style={{ textDecoration: "none" }}>
                                    <Typography color="black">Mon Compte</Typography>
                                </Link>
                            </MenuItem>
                            <Link href="/login" style={{ textDecoration: "none" }}>
                                <MenuItem color="inherit">Déconnexion</MenuItem>
                            </Link>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='225px' textAlign='center' role='presentation'>
                    <Stack flexDirection="row" >

                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            Menu
                        </Typography>
                        <IconButton onClick={() => setIsDrawerOpen(false)}>
                            <RemoveIcon />
                        </IconButton>
                    </Stack>

                    <List>
                        {menuDrawer.map(item => {
                            return (
                                <Link href={item.link} key={item.link} style={{ textDecoration: "none" }}>
                                    <ListItem >
                                        <ListItemText primary={item.titre} />
                                    </ListItem>
                                </Link>
                            )
                        })}
                    </List>

                </Box>
            </Drawer>

            {/* <Box component="main" sx={{ flexGrow: 1 }} padding={{ xs: 1, sm: 2 }}>
                <Container maxWidth={maxWidth}>
                    {children}
                </Container>
            </Box> */}
        </Box>
    )
}

export default Navbar