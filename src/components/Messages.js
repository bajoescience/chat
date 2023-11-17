import { Box, Stack } from "@mui/material"
import Message from "./Message"


// Serves as a container to differentiate the user from friends message
const Messages = ({messages, contact}) => {
    // TODO: Sort messages by date in ascending order
    console.log();

    return (
        <>
            {/*TODO: complete the process for appending the messages to the chat board */}
            <Stack
            direction={'column-reverse'}
            sx={{
                // scrolling goes here
                overflowY: 'auto',
                height: 'inherit',
                position: 'relative'
            }}
            >
                {[...messages].sort((a, b) => -1).map(msg=> <Message 
                    key={msg.id} 
                    contact={contact}
                    // Message already has sender and receiver properties
                    message={msg}
                />
                )}           
            </Stack>
        </>
    )
}

export default Messages