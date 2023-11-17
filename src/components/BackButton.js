import React from 'react'
import { StyledButton } from './Button'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

const BackButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('.')
    }

  return (
    <>
      <Button 
      onClick={handleClick} 
      disableElevation  
      startIcon={<ArrowBack />}
      sx={{
        mt: 1,
        color: 'gray'
      }}>
        Back
      </Button>
    </>
  )
}

export default BackButton