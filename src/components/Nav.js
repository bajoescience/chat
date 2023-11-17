import {Tab, Tabs, Box, IconButton, Menu, MenuItem, Typography, Stack, Toolbar, Button} from '@mui/material'
import {styled} from '@mui/material/styles'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ChatIcon from '@mui/icons-material/Chat'
import * as React from 'react'


const Nav = ({value, setValue, logOut}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenuToggle = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = (e) => {
        setAnchorEl(null)
    }

    const handleLogOut = () => {
        logOut()
        setAnchorEl(null)
    }

    // Define the visitable pages
    const pages = [
        {name: 'Single Chat', onClick: null},
        {name: 'Group Chat', onClick: null},
    ]

    const handleTabsChange = (e, newValue) => {
        setValue(newValue)
    }

    const MyTab = styled(Tab)(({theme}) => ({
        marginRight: theme.spacing(6),
        fontSize: '13px',
        fontWeight: theme.typography.fontWeightLight
    }))

    const renderNavPages = (pages) => (
        pages.map((page, i) => (
            <MyTab key={i} label={page.name} onClick={page.onClick} sx={page.sx} />
        ))
    )

    return (
        <>
        <Toolbar direction={'row'} >
            <Box flexGrow={1}>
                <Button 
                  size='large' 
                  startIcon={<ChatIcon />} 
                  color='secondary' 
                  disabled 
                  sx={{
                  fontWeight: 'bold'
                  }}>
                    Chat
                </Button>
            </Box>
            {/**<Tabs value={value} onChange={handleTabsChange} >
                {renderNavPages(pages)}
            </Tabs> */}
            <IconButton onMouseOver={handleMenuToggle} onClick={handleMenuToggle}>
                <AccountCircle />
                </IconButton>
                <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLogOut}>logOut</MenuItem>
                </Menu>    
        </Toolbar>
        </>
    )
}

export default Nav