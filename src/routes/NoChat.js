import { Box, Typography } from "@mui/material"

const NoChat = () => {
    return (
        <>
            <Box sx={{
                bgcolor: 'white',
                height: '100vh',
                pt: 10,
                fontWeight: 'bold',
                textAlign: 'center',
                borderRadius: 4,
                margin: {xs: 2}
            }} >
                <Typography>
                    No messages yet
                </Typography>
                <Typography>
                    click a chatblock to start a conversation
                </Typography>
            </Box>
        </>
    )
}

export default NoChat