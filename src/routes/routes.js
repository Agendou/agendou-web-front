import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "../pages/LoginRegister/LoginRegister";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login-register" element={<LoginRegister />} />
                    <Route path="/" element={<LandingPage />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;