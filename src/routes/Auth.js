import { Outlet, useMatch, Navigate, useOutletContext } from 'react-router-dom'
import { CssBaseline, Avatar, } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import { blue } from '@mui/material/colors'
import ChatIcon from '@mui/icons-material/Chat'



const Auth = (props) => {
    const theme = createTheme()
    const context = useOutletContext()
    const {userState: {user}} = context
    const match = useMatch('/chat/auth')

    // If user exists, no need to authenticate
    if (user) return <Navigate replace to={'/chat/room'} />

    // Re-route to signin route if route matches '/chat/auth
    if (match) {
        return <Navigate replace to={'/chat/auth/signin'} />
    }
    

    
    return (
        <>
          <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs' sx={{font: 'helvetica, Arial'}}>
            <CssBaseline />
            <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
                <Avatar sx={{ bgcolor: blue[600], m: 1}}>
                    <ChatIcon />
                </Avatar>

                {/* Replaceable starts here */}
                <Outlet context={context} />
                {/* Replaceable ends here */}
            </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}

export default Auth