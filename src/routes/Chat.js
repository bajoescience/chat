import { Box, Grid } from "@mui/material"
import { useState } from "react";
import { Outlet, useMatch, useNavigate, useOutletContext } from "react-router-dom";
import ChatList from "../components/ChatList";
import { StyledButton } from "../components/Button";
import Search from "../components/Search";
import notifService from "../services/notif";
import BackButton from "../components/BackButton";

const Chat = () => {
    const context = useOutletContext()
    const { contactState, userState} = context
    const {user} = userState
    const contacts = contactState.contacts
    const navigate = useNavigate()

    const match = useMatch('/chat/room/:userId/:contactId')

    // When Clicked, load contact messages
    const handleChatBoxClick = (contactId) => async (e) => {

        // Ignore holding down the chatbox
        if (e.type === 'keydown') {
            return
        }

        // Check if notification document between user and contact exists, 
        const allNotifs = await notifService.getAll()
        const notif = allNotifs.find(
            notif => notif.sender === contactId && notif.receiver === user.id
        )

        // TODO: If notification exists and the count is not zero, update notif count to zero
        if (notif && notif.count !== 0) {
            const newNotif = {...notif, count: 0}
            await notifService.update(notif.id, newNotif)
        }
  
        // TODO: Update notification change to the server 
        navigate(`/chat/room/${user.id}/${contactId}`)
      }
  

    // Keep track of filtering of contacts
    const [filter, setFilter] = useState(contacts)

    // Handle searching of message list
    const handleSearch = (e) => {
        const filler = e.target.value
        setFilter(contacts.filter((person) => {
            const name = `${person.firstName} ${person.lastName}`
            return name.toUpperCase().includes(filler.toUpperCase())
        }))
    }


    return (
        <>
        <Box sx={{ p: 2, flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={8} sm={4}>
                    <Box display={{xs: match ? 'none':'block', md: 'block'}}>
                      <Search handleSearch={handleSearch} />
                    </Box>
                    <Box display={{xs: match ? 'block' :'none', md: 'none'}}>
                      <BackButton />
                    </Box>
                </Grid>
                <Grid item xs={4} sm={8}>
                    <StyledButton
                      href="https://youtu.be/SHRAEqxoN0c"
                      target='_blank'
                      variant='contained'
                      sx={{float: 'right', mt: 1,}}
                      disableElevation
                    >
                    More
                    </StyledButton>
                </Grid>
                <Grid item 
                  xs={12} 
                  md={5} 
                  lg={4} 
                  sx={{
                    display: {xs: match ? 'none': 'block', md: 'block'}
                  }}>
                  {<ChatList
                    contacts={filter}
                    onClick={handleChatBoxClick}
                    userState={userState}
                   />}
                </Grid>
                <Grid item 
                  xs={12} 
                  md={7} 
                  lg={8} 
                  sx={{
                    display: {xs: match ? 'block': 'none', md: 'block'}
                  }}>
                    <Outlet context={context} />
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Chat 