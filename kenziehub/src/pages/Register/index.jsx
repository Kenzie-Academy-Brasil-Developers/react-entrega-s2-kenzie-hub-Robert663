import {InputLabel, FormControl,MenuItem, Box, Container, CssBaseline, Select, Button, Typography, TextField} from '@mui/material';
import {useState} from 'react';
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom'
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const Register = () => {
    const history = useHistory();
    const [course_module, setcourse_module] = useState('')
    const handleChange = (e) => {
        setcourse_module(e.target.value);
    };     

    const schema = yup.object().shape({
        email: yup.string().email('Digite um email válido').required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório')
        .matches(/^(?=.{6})/, 'Senha inválida'),
        // passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais'),
        bio: yup.string().required().default('loren ipsum'),
        contact: yup.string().required().default('lorem ipsun'),
        name: yup.string().required('Campo obrigatório'),
        course_module: yup.string().required('Escolha o módulo correspondente ao seu') 
    })
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm ({resolver: yupResolver(schema)})
    
    const handleCadastro = (data) => {
         const response =  api.post('/users/', data)
         .catch((err ) => {

        history.push('/')
    })};

    return (
    <>
    <Container maxWidth component = 'header' sx = {{bgcolor: '#121214', color: '#FF577F'}}>
        <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 120}}>
        <Typography variant = 'h1' fontSize={30} marginRight={6} display = 'flex' alignItems = 'center'>
                    Kenzie Hub
                </Typography>
                    <Button component = {Link} to = '/' >Voltar</Button>
        </Box>
    </Container>
        <Container maxWidth component = 'main' sx ={{bgcolor: '#212529', color: '#F8F9FA'}}>
            <CssBaseline/>
            <Box 
             onSubmit = {handleSubmit(handleCadastro)}            
             sx={{ marginTop: '', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography sx={{mt: 5, fontSize: 22}}component = 'p' variant = 'h5'>
                    Crie sua conta
                </Typography>
                <Typography sx = {{fontSize: 12, mt: 2, mb: 3}} component = 'p'>
                    Rápido e grátis, vamos nessa!
                </Typography>
                <Box 
                 component = 'form'
                 onSubmit = {handleSubmit(handleCadastro)}
                height = '100vh'>
                        Nome
                    <TextField
                    {...register('name')}
                    InputLabelProps={{style: {color: '#F8F9FA',}}} 
                    sx={{input: { color: '#F8F9FA', bgcolor: '#343B41'}}} margin = 'normal' label = 'Digite aqui seu nome' fullWidth >
                    </TextField>
                        Email
                    <TextField 
                    {...register('email')}
                    sx={{input: {color: '#F8F9FA', bgcolor: '#343B41' }}}
                    InputLabelProps={{style:{
                        color:'#F8F9FA'
                    }}} margin  = 'normal' label = 'Digite aqui seu email' fullWidth type = 'email'></TextField>
                    Senha
                    <TextField 
                    {...register('password')}
                    helperText = {errors.password?.message}
                    error = {!!errors.password?.message}
                    type = 'password'
                    sx={{input: { color: '#F8F9FA', bgcolor: '#343B41'}}} 
                    InputLabelProps={{style: {color: '#F8F9FA'}}}  margin  = 'normal' label = 'Digite aqui sua senha' fullWidth>
                    </TextField>
                    Confirmar senha
                    <TextField 
                    // {...register('passwordConfirmation')}
                    helperText = {errors.passwordConfirmation?.message}
                    error = {!!errors.passwordConfirmation?.message}
                    type = 'password'
                    sx={{input: { color: '#F8F9FA', bgcolor: '#343B41'}}} 
                    InputLabelProps={{style: {color: '#F8F9FA'}}} margin  = 'normal' label = 'Confirme sua senha' fullWidth>
                    </TextField>
                    Selecionar módulo
                    <FormControl fullWidth margin = 'normal' sx={{bgcolor: '#343B41'}}>
                    <InputLabel  sx= {{color: '#F8F9FA'}}id="selectModule">Selecione o seu módulo</InputLabel>
                    <Select
                        {...register('course_module')}
                        labelId="selectModule"
                        id="selectModule"
                        value={course_module}
                        error = {!!errors.course_module?.message}
                        label="Selecione o seu módulo"
                        onChange={handleChange}
                        sx = {{color: '#F8F9FA'}}
                        fullWidth
                        >
                        <MenuItem value={"Primeiro módulo (Introdução ao Frontend)"}>Módulo 1</MenuItem>
                        <MenuItem value={"Segundo módulo (Frontend Avançado)"}>Módulo 2</MenuItem>
                        <MenuItem value={"Terceiro módulo (Introdução ao Backend)"}>Módulo 3</MenuItem>
                        <MenuItem value={"Quarto módulo (Backend Avançado)"}>Módulo 4</MenuItem>
                        </Select>
                        </FormControl>
                    <Button type = 'submit' style = {{backgroundColor: '#59323F'}}fullWidth variant='contained'>Cadastrar</Button>                    
                </Box>
            </Box>
        </Container>
    </>
    )
}

export default Register