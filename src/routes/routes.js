import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import LoginRegisterComerciante from "../pages/LoginRegisterComerciante/LoginRegisterComerciante";
import LoginRegisterCliente from "../pages/LoginRegisterCliente/LoginRegisterCliente";
>>>>>>> 217bdac91a382ab27795a6ac496a33d60dd3991a
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard"; 
import ProfileProfissional from "../pages/ProfileProfissional/ProfileProfissional";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/profile-profissional" element={<ProfileProfissional />} />
                <Route path="/login-register-user-admin" element={<LoginRegisterComerciante />} />
                <Route path="/login-register-user" element={<LoginRegisterCliente />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;