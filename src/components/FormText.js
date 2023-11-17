import { TextField, InputAdornment } from "@mui/material"

const FormText = (props) => {
    return (
        <>
            <TextField
              margin={props.margin || 'none'}
              variant='standard'
              required
              fullWidth
              helperText={props.helperText}
              color={props.color || 'primary'}
              error={props.error || null}
              id={props.id}
              label={props.label}
              name={props.name || null}
              autoComplete={props.autoComplete}
              type={props.type || 'text'}
              autoFocus={props.autoFocus ? true : null}
              InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        {props.children}
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {props.endAdornment || null}
                    </InputAdornment>
                )
              }}
            />
        </>
    )
}

export default FormText