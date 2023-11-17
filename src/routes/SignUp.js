import {Typography, FormControlLabel, Checkbox, Grid, Link, TextField, InputAdornment, IconButton, Box} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import FormText from '../../src/components/FormText'
import Button from '../../src/components/Button'
import Form from '../../src/components/Form'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';

import userService from '../services/user';

const SignUp = (props) => { 
    const navigate = useNavigate()
    const {userState: {setUser}} = useOutletContext()
    const [remember, setRemember] = useState(false)
    const defaultHelperTextState = {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        confirm: null
    }
    // Create a helper text state for each text-field to handle errors
    const [helperTextObj, sethelperTextObj] = useState(defaultHelperTextState)

    // Create state to help control password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // For now, just login user
        const data = new FormData(e.currentTarget)
        const username = data.get('username')
        const password = data.get('password')
        const confirm = data.get('confirm')
        const email = data.get('email')
        const firstName = data.get('firstname')
        const lastName = data.get('lastname')
        const userObj = { password, email, username, lastName, firstName}
        
        // Handle all erorrs regarding user input
        let error = false
        Object.keys(userObj).forEach(userdetail => {
            // Handle if the textfield was left blank by user
            if (!userObj[userdetail] || userObj[userdetail] === '') {
                const string = userdetail.toLowerCase() + ' is required'
                sethelperTextObj({...defaultHelperTextState, [userdetail]: string})
                error = true
                return
            }
        })
        if (error) return

        // Handle if passwords do not match
        if (password !== confirm) {
            const string =  'Passwords do not match'
            const newObj = {...defaultHelperTextState, confirm: string}
            sethelperTextObj(newObj)
            return
        }

        // Check if username exists in database
        const users = await userService.getAll()
        const user = users.find(user => user.username === username)
        if (user) {
            // Handle username duplication error
            const string =  'Username already exists'
            const newObj = {...defaultHelperTextState, username: string}
            sethelperTextObj(newObj)
            return
        }

        // Add user credentials to database
        const newUser = await userService.create(userObj)
        const refinedUser = {...newUser, password: undefined}

        // Save userData to localStorage based on remember state variable
        if (remember) {
           // Save user object to memory
           localStorage.setItem(
           'loggedUser', JSON.stringify(refinedUser)
           ) 
        }

        setUser(refinedUser)
    }

    const handleSignupRedirect = (e) => {
        navigate('/chat/auth/signin')
    }
    return (
        <>
            <Typography component='h1' variant='h5'>
                Sign up
            </Typography> 

           <Box p={{xs: 4, sm: 0}} pt={{sm: 2}}>
            <Form onSubmit={handleSubmit} noValidate >
                <Grid container spacing={{xs: 3, sm: 3}} columnSpacing={{xs: 4}}>

                    <Grid item xs={12} sm={6}>
                        <FormText 
                        id='firstname'
                        name='firstname' 
                        label='First Name'
                        autoComplete='firstname'
                        autoFocus
                        helperText={helperTextObj.firstName}
                        error={Boolean(helperTextObj.firstName)}
                        >
                            <MoreHorizIcon />
                        </FormText>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormText 
                        id='lastname' 
                        name='lastname'
                        label='Last Name'
                        autoComplete='lastname'
                        helperText={helperTextObj.lastName}
                        error={Boolean(helperTextObj.lastName)}
                        >
                            <MoreHorizIcon />
                        </FormText>
                    </Grid>

                    <Grid item xs={12}>
                        <FormText 
                        id='username' 
                        name='username'
                        label='Username'
                        autoComplete='username'
                        helperText={helperTextObj.username}
                        error={Boolean(helperTextObj.username)}
                        >
                            <AccountCircle />
                        </FormText>
                    </Grid>

                    <Grid item xs={12}>
                        <FormText 
                        id='email' 
                        name='email'
                        label='E-mail'
                        autoComplete='email'
                        helperText={helperTextObj.email}
                        error={Boolean(helperTextObj.email)}
                        >
                            <EmailIcon />
                        </FormText>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant='standard'
                        required
                        fullWidth
                        id='password' 
                        name='password'
                        label='Password'
                        autoComplete='current-password'
                        type={passwordVisibility ? 'text' : 'password'}
                        helperText={helperTextObj.password}
                        error={Boolean(helperTextObj.password)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <LockIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                          )
                        }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        variant='standard'
                        required
                        fullWidth
                        id='confirm' 
                        name='confirm'
                        label='Confirm Password'
                        autoComplete='current-password'
                        type={confirmPasswordVisibility ? 'text' : 'password'}
                        helperText={helperTextObj.confirm}
                        error={Boolean(helperTextObj.confirm)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <LockIcon />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}>
                                  {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                          )
                        }}
                        />
                    </Grid>  
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox name='remember' value={remember} checked={remember} onChange={() => {setRemember(!remember)}} color='primary'/>} label='Remember Me' sx={{mt: 2}}
                    />
                </Grid>
                <Button
                type='submit'
                fullWidth
                variant='contained'
                >
                SIGN UP
                </Button>

                <Grid container sx={{mb: 8}} justifyContent='flex-end'>
                    <Grid item>
                    <Link variant='body2' onClick={handleSignupRedirect}>
                        {'Already have an account?, sign in'}
                    </Link>
                    </Grid>
                </Grid>
            </Form>
           </Box>
        </>
    )
}

export default SignUp