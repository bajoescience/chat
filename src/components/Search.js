import { TextField, InputAdornment } from "@mui/material"
import  SearchIcon from '@mui/icons-material/Search'
import {styled} from '@mui/material'

const MySearch = styled(TextField)(({theme}) => ({
  '& .MuiInputBase-root': {
    borderRadius: '50px',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    fontFamily: 'sans-serif',
    color: 'black',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    },
  }
}))

const Search = (props) => {
    return (
        <>
            <MySearch
            variant="outlined"
            onChange={props.handleSearch} 
            placeholder='SEARCH'
            fullWidth
            InputProps={{
              startAdornment: (
                  <InputAdornment position='start'>
                      <SearchIcon />
                  </InputAdornment>
              )
            }}
            />
        </>
    )
}

export const NewSearch = MySearch

export default Search