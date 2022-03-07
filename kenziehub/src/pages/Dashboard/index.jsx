import {Box, Container, CssBaseline, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Link} from 'react-router-dom';
import {AiOutlinePlusSquare} from 'react-icons/ai';
const Dashboard = () => {
    return (
        <>
        <CssBaseline/>
        <Container maxWidth component = 'header' sx = {{bgcolor: '#121214', color: '#FF577F', height: '100vh'}}>
            <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 120}}>
            <Typography variant = 'h1' fontSize={30} marginRight={6} display = 'flex' alignItems = 'center'>
                        Kenzie Hub
                    </Typography>
                        <Button sx ={{bgcolor: '#343B41', color:'#F8F9FA', height: 30, marginTop: 5}} component = {Link} to = '/'>Sair</Button>
            </Box>
            <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 80}}>
                user infos
            </Box>
            <Typography sx = {{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                Tecnologias <AiOutlinePlusSquare size = {25}/>
            </Typography>
            <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'column'}}>
                <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 50, marginTop: 5}}>React JS</Box>
                <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 50, marginTop: 5}}>Next JS</Box>
                <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 50, marginTop: 5}}>Material UI</Box>
                <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 50, marginTop: 5}}>Styled-Components</Box>
                <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 50, marginTop: 5}}>Chackra UI</Box>
                <Box sx = {{display:'flex', width: '100%', justifyContent: 'space-between', height: 50, marginTop: 5}}>Material UI</Box>
            </Box>
            </Container>
        </>
    )
}

export default Dashboard