import {createBrowserRouter} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/SignIn';


export const router = createBrowserRouter([
    {path:'/sign-up', element:<Signup/>},
    {path:'/sign-in', element:<Signin/>},
])
