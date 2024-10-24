import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegisterComerciante from "../pages/LoginRegisterComerciante/LoginRegisterComerciante";
import LoginRegisterCliente from "../pages/LoginRegisterCliente/LoginRegisterCliente";
import Home from "../pages/Home/Home";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login-register-user-admin" element={<LoginRegisterComerciante />} />
                    <Route path="/login-register-user" element={<LoginRegisterCliente />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;