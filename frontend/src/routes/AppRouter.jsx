import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tareas from "../pages/Tareas";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tareas" element={<Tareas />} />
            </Routes>
        </BrowserRouter>
    )
}
