import { Box, Paper, Stack } from "@mui/material"
import helper from "../helper/helper"
import ChatBox from './ChatBox'
import { useEffect, useState } from "react"
import notifService from '../services/notif'
import notif from "../services/notif"
import { useMatch } from "react-router-dom"

const ChatList = ({contacts, onClick, userState: {user}}) => {
    // These are all the notifs in the database
    const [notifs, setNotifs] = useState([])

    // Contacts that have an active notification
    const [yesNotif, setYesNotif] = useState([]);

    // Contcats that have no active notification
    const [noNotif, setNoNotif] = useState([])

    // TODO: Show only the chat blocks if route at '/chat/room/:userId'
    // Else if route at [messageblock] route, show only message block

    // Get all the notif documents
    useEffect(() => {
        const getNotifs = async () => {
            const notifications = await notifService.getAll()
            setNotifs(notifications)
        }
        getNotifs()
    }, [user])

    useEffect(() => {
        // Sort contacts that have an active notification 
        // Returns an object containing notif count and the contact details
        setYesNotif(contacts.filter(contact => {
            const notifObj = notifs.find(notif => 
                (notif.receiver === user.id && notif.sender === contact.id)   
            )
            return notifObj?.count > 0
        }).map(contact => {
            const notifObj = notifs.find(notif => 
                (notif.receiver === user.id && notif.sender === contact.id)   
            )
            if (!notifObj) return contact
            return {...contact, notif: {
                count: notifObj.count,
                date: notifObj.date,
                message: notifObj.message
            }}
        }))

        // Sort contacts that have no active notification
        setNoNotif(contacts.filter(contact => {
            const notifObj = notifs.find(notif => 
                (notif.receiver === user.id && notif.sender === contact.id)   
            )
            if (!notifObj) return true
            return notifObj.count === 0
        }).map(contact => {
            const notifObj = notifs.find(notif => 
                (notif.receiver === user.id && notif.sender === contact.id)   
            )
            if (!notifObj) return contact
            return {...contact, notif: {
                count: notifObj.count,
                date: notifObj.date,
                message: notifObj.message
            }}
        }))
    }, [user, contacts, notifs])

    const displayChatBox = contact => {
        return (
            <ChatBox 
              key={contact.id} 
              contact={contact} 
              onClick={onClick}
            />
        )
    }
    

    return (
        <>
            <Stack id="chatlist" 
            sx={{
                backgroundColor: 'white',
                maxHeight: {xs: 'fit-content', md: '80vh'}, 
                minHeight: '20vh',
                overflow: {xs: 'visible', md: 'auto'}, 
                borderRadius: 4,
                borderTopRightRadius: 2,
                borderBottomRightRadius: 2,
                p: 2,
            }}>
                {
                    // Render list of chats that have notification
                    yesNotif.length > 0
                    ? yesNotif.map(displayChatBox) 
                    : <Box sx={{mr: 4, textAlign: 'center'}}>Sorry no match was found :/</Box>
                }
            </Stack>
            <Paper 
            elevation={6}
            sx={{
                backgroundColor: 'white',
                minHeight: '20vh', 
                maxHeight: {xs: 'fit-content', md: '70vh', lg: '80vh'}, 
                overflow: {xs: 'visible', md: 'auto'}, 
                borderRadius: 4,
                borderTopRightRadius: 2,
                borderBottomRightRadius: 2,
                p: 2, 
                m: 1,
                ml: {xs: 0, md: -5},
                mb: {xs: 2, md: 5} ,
            }}>
                <Stack spacing={1}>
                    {
                        // Render list of chats that have no notification
                        noNotif.length > 0
                        ? noNotif.map(displayChatBox)
                      : <Box sx={{mr: 4, textAlign: 'center', }}>Sorry no match was found :/</Box>
                    }
                </Stack>
            </Paper>
        </>
    )
}

export default ChatList