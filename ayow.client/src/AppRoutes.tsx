import path from "path";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/weather",
        element: <Weather />
    }
];

export default AppRoutes;
