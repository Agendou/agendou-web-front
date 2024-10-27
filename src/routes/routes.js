import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;