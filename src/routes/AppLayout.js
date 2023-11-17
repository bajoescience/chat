import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Paper } from "@mui/material";
import React, { useEffect } from "react";
import Nav from "../../src/components/Nav";
import Drawer from "../../src/components/Drawer";
import { Navigate, Outlet, useMatch, useOutletContext } from "react-router-dom";

const AppLayout = (props) => {
    const context = useOutletContext()

    const theme = createTheme()

    const {userState: {user}} = context
    const match = useMatch('/chat/room')

    // Store navlinks in state

    // And return chat room type based on the navbar value state
    const [value, setValue] = React.useState(0)




    // If user does not exist, need to authenticate
    if (!user) return <Navigate replace to={'/chat/auth'}/>

    // Re-route to user's chat route if route matches '/chat/app'
    if (match) {
        return <Navigate replace to={'/chat/room/' + user.id} />
    }

    // Create Nav bar container
    const MyContainer = styled(Box)(({theme}) => ({
      backgroundColor: 'gainsboro',
      fontFamily: 'sans-serif',
      width: 'auto',
      [theme.breakpoints.down('md')]: {
          padding: theme.spacing(0)
      },
      [theme.breakpoints.up('md')]: {
          paddingTop: theme.spacing(8),
          paddingLeft: theme.spacing(16)
      }
    }))

  return (
    <>
      <ThemeProvider theme={theme}>
                <CssBaseline />
                <MyContainer >
                    <Paper 
                    elevation={3} 
                    sx={{
                        backgroundColor: 'aliceblue',
                        minHeight: '92vh'
                    }}>
                        <Nav 
                            logOut={context.logOut} 
                            value={value} 
                            setValue={setValue} 
                          /> 
                        <Outlet context={context} />
                    </Paper>
                </MyContainer>
            </ThemeProvider>
    </>
  )

}

export default AppLayout