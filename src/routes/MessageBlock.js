import { Box, IconButton, Stack,} from "@mui/material"
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from "react"
import { SendTwoTone} from '@mui/icons-material/';
import SendIcon from '@mui/icons-material/Send';
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import { useOutletContext, useParams } from "react-router-dom";
import messageService from "../services/messages";
import notifService from "../services/notif";


// TODO: At the top bar, add a back button to chat
const MessageBlock = (props) => {
    const [toggleEmoji, setToggleEmoji] = useState(false)
    const [sendHover, setSendHover] = useState(false)
    const [message, setMessage] = useState({
        string: '',
        files: []
    })

    // Store the messages between the user and contact in state
    const [messages, setMessages] = useState([])
    console.log(messages);


    const {contactState, userState: {user}} = useOutletContext()

    // Get contact id from URL string
    const {contactId: id} = useParams()
    const contactId = Number(id)

    // First, get all the messages between user and contact
    useEffect(() => {
        const getChatMessages = async () => {
            const allMessages = await messageService.getAll()
            const bool = (msg) => {
                if (
                    (msg.sender === user.id && msg.receiver === contactId) 
                    || 
                    (msg.receiver === user.id && msg.sender === contactId))
                {
                    return true
                }
                return false
            }
            setMessages(allMessages.filter(bool))
        }
        getChatMessages()
    }, [user, contactId])

    const contact = contactState.contacts.find(contact => contact.id === contactId)

    const renderEmoji = () => <span><EmojiPicker onEmojiClick={handleEmojiClick} /></span>

    const handleEmojiClick = (e) => {
        setMessage({...message, string: message.string.concat(e.emoji)})
    }

    const handleFileSubmission = (e) => {
        setMessage({...message, files: message.files.concat(...(e.target.files[0]))})
    }

    const handleMessageChange = (e) => {
        setMessage({...message, string: e.target.value})
    }

    //Create a message
    // update notif count of contact , so that contact can see the notif
    const handleMessageSubmission = async (e) => {
        if (e.type === 'keydown') {
            return
        }
        // Do something with the message here
        const messageObject = {
            ...message,
            date: new Date().toLocaleTimeString(),
            sender: user.id,
            receiver: contactId
        }

        // Create the message
        const newMessage = await messageService.create(messageObject)
        setMessages(messages.concat(newMessage))

        // Update the notif of the contact
        const notifs = await notifService.getAll()
        const notif = notifs.find(notif => notif.sender === user.id && notif.receiver === contactId)

        // TODO: Add only a subset of the total message
        const getMessageString = () => {
            const string = newMessage.string
            if (string !== '') {
                return string
            } else {
                // handle when user only sends files
                if (newMessage.files.length !== 0) {
                    return "'files'"
                } else {
                    return ''
                }
            }

        }
        // Create notif object supposed properties taken from the newMessage
        const props = {
            date: newMessage.date,
            message: getMessageString()
        }
        // If notif does not exist, create notif
        if (notif) {
            // If notif exists, just update notif count, message and date
            const notifObj = {
                ...notif,
                ...props,
                count: notif.count + 1,
            }
            await notifService.update(notif.id, notifObj)
        } else {
            const notifObj = {
                ...props,
                sender: user.id,
                receiver: contactId,
                count: 1,
            }
            
            // Save new notif object to database
            await notifService.create(notifObj)
        }

        // Clear input area
        setMessage({
            string: '',
            files: []
        })
    }

    const handleIconChange = (e) => {
        setSendHover(true)

        setTimeout(() => {
            setSendHover(false)
        }, 2000)
    }

    /* Assign the roles of the messages here
    if the message's sender is the current account user, 
    we put the message role as sender else, we put the message 
    role as receiver */
      // We can move this to the server side to implement
 return (
    <>
        <Stack 
        sx={{
            backgroundColor: 'white',
            height: {xs: '75vh', md: '100vh'},
            borderRadius: 2,
            p: 2,
        }}
        >
            <Box 
            sx={{
                height: '92%',
                width: 'inherit'
            }}>
                {/**The roles are defined as sender and receiver */}
                <Messages contact={contact} messages={messages} />
                
            </Box>
            <Stack height={'8%'} direction={'row'} spacing={10} >
                {/**This is the input container */}
                <Box width={600}>
                    <MessageInput 
                    message={message} 
                    renderEmoji={renderEmoji}
                    toggleEmoji={toggleEmoji}
                    handleMessageChange={handleMessageChange}
                    setToggleEmoji={setToggleEmoji}
                    handleFileSubmission={handleFileSubmission} 
                    />
                </Box>
                <Box
                sx={{
                    borderRadius: 10,
                    height: 70,
                    width: 70,
                    backgroundColor: 'lightblue',
                    position: 'relative',
                    bottom: 8,
                    pl: '10px',
                    pt: '8px',
                }}>
                    <IconButton 
                        // If mouseover event is alraedy registered, block it for some time
                        onClick={handleMessageSubmission}
                        onMouseOver={sendHover ? null : handleIconChange}
                        >
                            {sendHover ? <SendTwoTone fontSize="large"  /> : <SendIcon fontSize="large" />}
                    </IconButton>
                </Box>
            </Stack>
        </Stack>
    </>
 )
}

export default MessageBlock