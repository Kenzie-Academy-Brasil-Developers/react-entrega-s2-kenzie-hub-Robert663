import {Route, Switch} from 'react-router-dom';
import Login from '../../src/pages/Login/index'
import Register from '../pages/Register/index'
import Dashboard from '../pages/Dashboard/index'
import { useEffect, useState } from 'react'; 
const Routes = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('@KenzieHub:token') || ''
        if(token){
            setAuth(true)
        }
    }, [auth])

    return (
        <Switch>
            <Route exact path = '/'>
                <Login auth = {auth} setAuth = {setAuth}/>
            </Route>
            <Route exact path = '/register'>
                <Register/>
            </Route>
            <Route exact path = '/dashboard/'>
                <Dashboard auth = {auth} setAuth = {setAuth}/>
            </Route>
        </Switch>
    )
}

export default Routes   