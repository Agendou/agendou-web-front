import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Home from "../pages/Home/Home";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login-register" element={<LoginRegister />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;