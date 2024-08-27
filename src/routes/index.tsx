import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/private/home";
import Login from "../pages/public/login";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    }

])