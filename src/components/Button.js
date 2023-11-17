import { Button as MuiButton } from  '@mui/material'
import {styled} from '@mui/material'



const Button = (props) => {
    return (
        <>
            <MuiButton
            type={props.type}
            fullWidth={props.fullWidth ? true: null}
            variant={props.variant || 'contained'}
            sx={props.sx || {mt: 2, mb: 3}}
            >
                {props.children}
            </MuiButton>
        </>
    )
}

export const StyledButton = (props) => {
    const MyButton = styled(MuiButton)(({theme}) => ({
        borderRadius: '30px',
        backgroundColor: 'white',
        color: 'gray',
        '&:hover': {
            backgroundColor: 'white'
        }
    }))
    return (
        <>
            <MyButton
            variant={props.variant}
            href={props.href}
            target={props.target}
            sx={props.sx}
            disableElevation={props.disableElevation}
            >
                {props.children}
            </MyButton>
        </>
    )

}

export default Button