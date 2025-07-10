import {createBrowserRouter} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/SignIn';
import UserProfile from './pages/user/UserProfile';
import { ProtectedRoute, ProtectedRouteHome } from './components/ProtectedRoute';


export const router = createBrowserRouter([
    {path:'/sign-up', element:<ProtectedRoute element={< Signup/>} />},
    {path:'/sign-in', element:<ProtectedRoute element={< Signin/>} />},
    {path:'/user/profile', element:<ProtectedRouteHome element={< UserProfile/>} />},
])
