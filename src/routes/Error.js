import { useRouteError } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Error } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error);

    return (
        <Container maxWidth='xs'>
          <Box sx={{mt: 8}}>
            <Avatar sx={{m: 1}}>
                <Error fontSize="inherit" />
            </Avatar>
            <h1>Oops! {error.status}</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            <i>Page {error.statusText || error.message}</i>
            </p>
          </Box>
        </Container>
    );
}

export default ErrorPage