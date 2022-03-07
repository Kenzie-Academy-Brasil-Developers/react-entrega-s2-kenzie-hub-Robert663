import {Box, Container, CssBaseline, Button, Typography, TextField} from '@mui/material';
// import {ThemeProvider} from '@mui/material/styles';
import {Link, useHistory, Redirect} from 'react-router-dom';
import * as yup from 'yup'
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const Login = ({auth, setAuth}) => {

    const api = axios.create({
        baseURL: "https://kenziehub.herokuapp.com/",
    });
    
    const history = useHistory();
    
    const schema = yup.object().shape({
        email: yup.string().email('Digite um email válido').required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório')
        .matches(/^(?=.{6})/,
        "Senha inválida."),
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm ({resolver: yupResolver(schema)})
    
    if(auth){
        return <Redirect to='/dashboard/'/>
    }
    const handleLogin = async (data) => {
       
       const response = await api.post('/sessions/', data).catch((err ) => {
           console.log(err);
       });
       
       localStorage.setItem('@KenzieHub:token', response.data.token);


        history.push('/dashboard/')
    }


    return(
        <Container maxWidth component = 'main' sx = {{bgcolor: '#212529', color: '#F8F9FA'}} >
            <CssBaseline/>
            <Box component='form'
             onSubmit={handleSubmit(handleLogin)}
            sx={{ marginTop: '', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx = {{fontSize: 30, mt: 15}}component = 'p' variant = 'h1'>
                Kenzie Hub
            </Typography>
            <Typography  sx = {{mt: 5}} component = 'p' variant = 'h4'>
               Login
            </Typography>
            <Box height = '100vh'>
                    <p>Email</p>
                <TextField 
                {...register('email')}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                InputLabelProps ={{style: {color: '#F8F9FA'}}}
                  sx={{input: { color: '#F8F9FA', bgcolor: '#343B41'}, helperText:{color: '#F8F9FA'}}} margin  = 'normal' fullWidth type = 'email'/>
                    <p>Senha</p>
                <TextField 
                {...register('password')}
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                InputLabelProps = {{style: {color: '#F8F9FA'}}}
                   sx={{ input:{color: '#F8F9FA', bgcolor: '#343B41'}}} margin  = 'normal'  fullWidth type='password'/>    
                <Button type = 'submit' style = {{marginTop:'30px', backgroundColor: '#FF577F'}}   variant = 'contained'  fullWidth >Entrar</Button>
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