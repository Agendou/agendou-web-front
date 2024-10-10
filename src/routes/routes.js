import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegisterComerciante from "../pages/LoginRegisterComerciante/LoginRegisterComerciante";
import Home from "../pages/Home/Home";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login-register" element={<LoginRegisterComerciante />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;