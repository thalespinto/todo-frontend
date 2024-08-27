import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/private/home";
import Login from "../pages/public/login";
import Register from "../pages/public/register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <Home />
    }

])