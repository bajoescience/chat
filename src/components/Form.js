import { Box } from "@mui/system"

const Form = (props) => {

    return (
        <>
         <Box component='form'
          onSubmit={props.onSubmit}
          sx={props.sx || {mt: 1}}
          noValidate={props.noValidate ? true : null}
          >
            {props.children}
         </Box>
        </>
    )
}

export default Form