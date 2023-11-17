import {Typography, FormControlLabel, Checkbox, Grid, Link, Box} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'
import FormText from '../../src/components/FormText'
import Button from '../../src/components/Button'
import Form from '../../src/components/Form'
import { useNavigate, useOutletContext } from 'react-router-dom'
import userService from '../services/user'
import { useState } from 'react'


const SignIn = (props) => {
  const navigate = useNavigate()
  const {userState: {setUser}} = useOutletContext()
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState({
    bool: false,
    message: ''
  })

  // Create a helper text state for each text-field to handle errors
  const defaultHelperTextState = {
    username: null,
    password: null,
  }

  const [helperTextObj, sethelperTextObj] = useState(defaultHelperTextState)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const username = data.get('username')
    const password = data.get('password')
    const userCredentials = {password, username}

    // Handle all errors regarding user input
    let err = false
    Object.keys(userCredentials).forEach(userDetail => {
      // Handle if the textfield was left blank by user
      if (!userCredentials[userDetail] || userCredentials[userDetail] === '') {
        const string = userDetail.toLowerCase() + ' is required'
        sethelperTextObj({...defaultHelperTextState, [userDetail]: string})
        err= true
        return
      }
    })
    if (err) return

    // Search for user in database
    const users = await userService.getAll()
    const userToLog = users.find(user => user.username === username && user.password === password)
    const refinedUser = {...userToLog, password: undefined}

    // TODO: Set error message, user does not exist
    if (!userToLog) {
      setError({bool: true, message: 'Incorrect Username Or Password'})
      return
    }

    // Save user to localStorage if remember me is set
    if (remember) {
      // Save user object to memory
      localStorage.setItem(
        'loggedUser', JSON.stringify(refinedUser)
        ) 
    }
    setUser(refinedUser)
  }

  const handleLoginRedirect = () => {
    navigate('/chat/auth/signup')
  }
  
  return (
    <>
      <Typography component='h1' variant='h5'>
          Sign in 
      </Typography>
      {error.bool && (<Typography component={'div'} variant='body2' pt={2} color={'error'}>
        {error.message}
      </Typography>)}

      <Box p={{xs: 2, sm: 0}}>
      <Form onSubmit={handleSubmit} noValidate>
          <FormText 
          margin='normal'
          id='username' 
          label='Username'
          autoComplete='username'
          name='username'
          autoFocus
          helperText={helperTextObj.username}
          error={Boolean(helperTextObj.username)}
          >
            <AccountCircle />
          </FormText>

          <FormText 
          margin='normal'
          id='password' 
          label='Password'
          name='password'
          autoComplete='current-password'
          type='password'
          helperText={helperTextObj.password}
          error={Boolean(helperTextObj.password)}
          >
            <LockIcon />
          </FormText>

          <FormControlLabel
          control={<Checkbox 
            value={remember} 
            name='remember' 
            checked={remember} 
            onChange={() => {setRemember(!remember)}} color='primary'
            />} label='Remember me' sx={{mt: 2}}
          />

          <Button
          type='submit'
          fullWidth
          variant='contained'
          >
          Join
          </Button>

          <Grid container sx={{mb: 8}} justifyContent='flex-end'>
              <Grid item xs>
                  <Link variant='body2'>
                  Forgot Password?
                  </Link>
              </Grid>
              <Grid item>
                <Link variant='body2' onClick={handleLoginRedirect}>
                    {"You don't have an account?, sign up"}
                </Link>
              </Grid>
          </Grid>
      </Form>
      </Box>
    </>    
  )
}


export default SignIn
