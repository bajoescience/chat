import { Box, Stack, Typography } from "@mui/material"
import UserAvatar from "./UserAvatar"

const Message = ({message, contact}) => {
    // TODO: Open the files
    const getFiles = () => {
        const files = message.files
        if (files.length === 0) {
            return 
        }

        // Open file
        return files.map(file => (
            <Box>
                {file}
            </Box>
        ))
    }

    // Messages sent by user
    if (message.receiver === contact?.id) {  
        return (
            <Box> 
                <Box  sx={{ 
                    p: 2, 
                    m: 2,
                    mb: 4,
                    backgroundColor: 'purple', 
                    color: 'aliceblue',
                    float: 'right',
                    borderRadius: 4,
                    borderBottomRightRadius: 0,
                    minWidth: {xs: '10vw', md: '4vw'},
                    maxWidth: {xs: '45vw', sm:'35vw', md: '20vw'},
                    boxShadow: 4
                }}>
                    <Typography component={'div'} sx={{float: 'right'}}>
                        {message?.string || 'okay' } 
                    </Typography>
                {/**Display files here */}
                </Box>
            </Box>
        )
    }

   // Messages received by user
   return (
    <Stack direction={'row'}>
        <Box 
          sx={{
            marginTop: 0.5,
          }}>
            <UserAvatar person={contact} />
        </Box>
        <Box 
        sx={{
            p: 2, 
            m: 2,
            mb: 4,
            backgroundColor: 'aliceblue', 
            color: '#555555',
            float: 'left',
            borderRadius: 4,
            borderTopLeftRadius: 0,
            minWidth: {xs: '10vw', md: '4vw'},
            maxWidth: {xs: '45vw',sm:'35vw', md: '20vw'},
            boxShadow: 8
        }}
        >
            <Typography component={'div'} sx={{float: 'left'}}>
                {message?.string || 'okay' }
            </Typography>
            {/**Display files here */}
        </Box>
    </Stack>
   )
}

export default Message