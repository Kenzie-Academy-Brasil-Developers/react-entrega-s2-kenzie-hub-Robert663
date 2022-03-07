import {Route, Switch} from 'react-router-dom';
import Login from '../../src/pages/Login/index'
import Register from '../pages/Register/index'
import Dashboard from '../pages/Dashboard/index'
const Routes = () => {
    return (
        <Switch>
            <Route exact path = '/'>
                <Login/>
            </Route>
            <Route exact path = '/register'>
                <Register/>
            </Route>
            <Route exact path = '/dashboard/'>
                <Dashboard/>
            </Route>
        </Switch>
    )
}

export default Routes   