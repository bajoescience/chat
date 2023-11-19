import { Box, Typography, Paper, styled, Divider } from "@mui/material"
import UserAvatar from "./UserAvatar"
import messageService from '../services/messages'

const ChatBox = ({contact, onClick}) => {
    const current = new Date()

    const date = (date) => {
        const newDate = date || current.toLocaleTimeString()
        const M = newDate.substring(8)
        const bf = newDate[5] === ':' ? newDate.substring(0, 5) : newDate.substring(0, 4)
        return bf + ' ' + M
    }

    const capitalize = () => {
        let firstname = contact.firstName//.toUpperCase()
        let lastname = contact.lastName//.toUpperCase()

        return `${firstname} ${lastname}`
    }

    // Allow the chatbox to be elevated on mouse hover
    const MyPaper = styled(Paper)(({theme}) => ({
        '&:hover': {
            boxShadow: theme.shadows[24],
        },
    }))


    return (
        <>
            <MyPaper
            elevation={0}  
            onClick={onClick(contact.id)}
            sx={{
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'nowrap',
                height: {xs: '20vh', md: '13vh', lg: '16vh'},
                p: 2, 
                alignItems: 'center',
                borderRadius: 3,
            }}>
                {<Box 
                sx={{
                    pr: 2, 
                    display: 'flex'
                }}>
                    <Box >
                        {<UserAvatar person={contact} />}
                    </Box>
                    {contact.notif?.count > 0 && (<Box>
                        <Box sx={{height: 30}}></Box>
                        <Box sx={{
                            height: 15,
                            width: 15,
                            backgroundColor: 'lightgreen',
                            borderRadius: 10,
                            border: '1px solid white',
                            bottom: '5%',
                            ml: -2,
                            position: 'relative',
                            left: 0,
                            right: 0
                        }}></Box>
                    </Box>)
                    }
                </Box>}
                {<Box 
                sx={{flexGrow: 1,}}>
                    <Box>
                    <Typography 
                    fontWeight='bold' 
                    fontSize={17} 
                    fontFamily= 'Arial, sans-serif'
                    >
                        {capitalize()}
                    </Typography>
                    </Box> 
                    <Box>
                        <Typography 
                        mb={1} color='GrayText'
                        fontSize={13} 
                        sx={{mt: 1}}
                        >
                            {
                            //TODO: the string of the newest message can be gotten by 
                            // accesing the latest message of the current person object
                            }
                            {Boolean(contact.notif?.message) ? contact.notif?.message : 'No message yet :)'}
                        </Typography>
                    </Box>
                </Box>}
                {<Box>
                    <Box>
                        <Typography 
                        fontWeight='bold' 
                        fontFamily='Arial, sans-serif'
                        >
                            {
                            //TODO: the date of the newest message can be gotten by 
                            // accesing the latest message of the current person object
                            }
                            {Boolean(contact.notif?.date) && date(contact.notif.date)}
                        </Typography>
                    </Box>
                    <Box height={32}>
                        { contact.notif?.count > 0 && (<Box 
                            fontFamily='Arial, sans-serif' 
                            sx={{
                                backgroundColor: 'lightsalmon',
                                color: 'white', 
                                width: 25, 
                                ml: 2, textAlign: 'center', 
                                border: '1px solid lightsalmon',
                                borderRadius: 15,
                                mt: 1,
                            }}>
                                {contact.notif?.count}
                            </Box>
                        )}
                    </Box>
                </Box>}
            </MyPaper>
            <Divider sx={{
                    display: {xs: '', md: ''}
                }}
            />
        </>
    )
}

export default ChatBox