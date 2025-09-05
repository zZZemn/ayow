import path from "path";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import AdminDashboard from "./pages/Admin/Home";

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
    },
    {
        path: "/admin",
        element: <AdminDashboard />
    }
];

export default AppRoutes;
