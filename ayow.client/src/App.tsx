import { Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
    return (
        <Routes>
            {AppRoutes.map((route, idx) => {
                if (route.index) {
                    return <Route key={idx} index element={route.element} />;
                }
                return <Route key={idx} path={route.path} element={route.element} />;
            })}
        </Routes>
    );
}

export default App;
