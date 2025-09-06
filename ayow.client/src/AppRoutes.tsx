import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Register from "./pages/Auth/Register";

import AdminDashboard from "./pages/Admin/Home";

import UserDashboard from "./pages/User/Home";
    
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
        path: "/register",
        element: <Register />
    },
    {
        path: "/weather",
        element: <Weather />
    },
    {
        path: "/admin",
        element: <AdminDashboard />
    },


    {
        path: "/user",
        element: <UserDashboard />
    }
];

export default AppRoutes;
