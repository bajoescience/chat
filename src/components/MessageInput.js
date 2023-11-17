import { Box, TextField, styled, InputAdornment, } from "@mui/material"
import { SentimentSatisfiedAlt as Smiley} from '@mui/icons-material/';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const MySearch = styled(TextField)(({theme}) => ({
    '& .MuiInputBase-root': {
        borderRadius: '70px',
      },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'aliceblue',
      fontFamily: 'sans-serif',
      color: 'black',
      '& fieldset': {
        borderColor: 'aliceblue',
      },
      '&:hover fieldset': {
        borderColor: 'aliceblue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'aliceblue'
      },
    }
}))

const MessageInput = (props) => (
    <MySearch
        variant="outlined" 
        fullWidth
        placeholder="Type a message"
        value={props.message.string}
        onChange={props.handleMessageChange}
        InputProps={{
            startAdornment: (
                <InputAdornment position='start'>
                    <Smiley fontSize="large" onClick={() => {props.setToggleEmoji(!props.toggleEmoji)}} />
                    {props.toggleEmoji && props.renderEmoji()}
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                    <Box component='label' >
                        <AttachFileIcon fontSize='medium' />
                        <input
                        type='file' 
                        hidden
                        onChange={props.handleFileSubmission}
                        />
                    </Box>
                </InputAdornment>
            )
        }}
    />
)

export default MessageInput