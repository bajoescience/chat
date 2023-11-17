import { Grid } from '@mui/material'
import React from 'react'
import ChatList from './ChatList'
import { StyledButton } from './Button'
import Search from './Search'

const SingleChat = ({
    children,
    filter,
    handleSearch, 
    handleChatBoxClick,
    userState,
    match
}) => {
    
  return (
    <>
      <Grid container spacing={2}>
            <Grid item xs={8} sm={4}>
                <Search handleSearch={handleSearch} />
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
                {children}
            </Grid>
        </Grid>
    </>
  )
}

export default SingleChat