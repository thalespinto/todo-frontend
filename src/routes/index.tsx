import {createBrowserRouter, redirect} from "react-router-dom";
import Home from "../pages/private/home";
import Login from "../pages/public/login";
import Register from "../pages/public/register";

const privatePagesLoader = () => {
    const token = localStorage.getItem("token");
    if (token) return null;
    return redirect("/");
}

const publicPagesLoader = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return redirect("/home");
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        loader: publicPagesLoader
    },
    {
        path: "/register",
        element: <Register />,
        loader: publicPagesLoader
    },
    {
        path: "/home",
        element: <Home />,
        loader: privatePagesLoader
    }

])