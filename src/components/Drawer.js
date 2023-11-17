import { Drawer as MuiDrawer, Box, IconButton, ListItem, ListItemButton, ListItemText, Divider, ListItemIcon, List, Collapse } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'
import AccountCircle from "@mui/icons-material/AccountCircle"
import {ExpandLess, ExpandMore} from '@mui/icons-material'

const Drawer = ({logOut, selectedIndex, setSelectedIndex}) => {
    // Boolean state for open and close of the drawer 
    const [open, setOpen] = React.useState(false)

    // Boolean state to keep track of open and close of account nest
    const [blow, setBlow] = React.useState(false)

    const toggleDrawer = (open) => e => {
        // Check if enter key is down or user clicks shift and tab buttons and ignore
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'shift')) {
            return
        }
        setOpen(open)
    }

    // Define the visitable pages
    const pages = [
        {name: 'Single Chat', onClick: () => null},
        {name: 'Group Chat', onClick: () => null}, 
    ]

    // Change the selected button to current when hovered upon
    const handleSelectedHover = (page, i) => e => {
        setSelectedIndex(i)
        page.onClick()
    }

    // Unnest the account button in the drawer navigation
    const handleBlowChange = (e) => {
        setBlow(!blow)
    }

    // The list of items in drawer
    const list = () => (
        <Box sx={{width: 150}}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        onTouchStart={toggleDrawer(false)}
        >
            <List>
                {pages.map((page, i) => (
                    <>
                        <ListItem disablePadding >
                            <ListItemButton 
                            selected={selectedIndex === i}
                            onMouseOver={handleSelectedHover(page, i)}
                            onTouchStart={handleSelectedHover(page, i)} >
                                <ListItemText secondary={page.name}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onTouchStart={handleBlowChange}>
                        <ListItemIcon>
                            <AccountCircle />
                            <ListItemText secondary='PROFILE' sx={{ml: 1}} />
                            {blow ? <ExpandLess />: <ExpandMore />}
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <Collapse in={blow} timeout='auto' unmountOnExit>
                    <List>
                        <ListItem sx={{ml: 4, mt: -1}} disablePadding>
                            <ListItemButton
                            onClick={logOut}
                            >
                                <ListItemText secondary='log Out' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </Collapse>
            </List>
        </Box>
    )

    return (
        <React.Fragment key='left'>
            <Box>
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <MuiDrawer
                open={open}
                onClose={toggleDrawer(false)}>
                    {list()}
                </MuiDrawer>
            </Box>
        </React.Fragment >
    )
}

export default Drawer