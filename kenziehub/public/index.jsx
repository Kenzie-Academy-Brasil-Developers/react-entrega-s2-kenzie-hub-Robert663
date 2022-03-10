import {Box, Container, CssBaseline, Button, Typography, TextField} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';

import theme from '../../styles/theme'
import { Link } from 'react-router-dom';
const Login = () => {
    return(
        <Container sx = {{bgcolor: '#212529', color: '#F8F9FA'}} >
            <CssBaseline/>
            <Box sx={{ marginTop: '', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx = {{fontSize: 30, mt: 15}}component = 'p' variant = 'h1'>
                Kenzie Hub
            </Typography>
            <Typography  sx = {{mt: 5}} component = 'p' variant = 'h4'>
               Login
            </Typography>
            <Box height = '100vh'>
                <ThemeProvider theme={theme}>
                    Email
                <TextField InputLabelProps ={{style: {color: '#F8F9FA'}}}
                sx={{input: { color: '#F8F9FA', bgcolor: '#343B41'}}} margin  = 'normal' fullWidth type = 'email'/>
                <p>Senha</p>
                <TextField InputLabelProps = {{style: {color: '#F8F9FA'}}}
                sx={{ input:{color: '#F8F9FA', bgcolor: '#343B41'}}} margin  = 'normal'  fullWidth type='password'/>
                </ThemeProvider>
                <Button style = {{marginTop:'30px', backgroundColor: '#FF577F'}}   variant = 'contained'  fullWidth >Entrar</Button>
                <Typography sx={{textAlign: 'center', mt: 3}}component = 'p'>
                    Ainda não possui uma conta?
                </Typography>
                <Button component={Link} to ='/register' style = {{marginTop:'30px', backgroundColor: '#868E96'}}   variant = 'contained'  fullWidth >Cadastrar-se</Button>
            </Box>
        </Box>
        </Container>

    )
}

export default Login;