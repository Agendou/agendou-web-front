import LoginRegisterComerciante from "../pages/LoginRegisterComerciante/LoginRegisterComerciante";
import LoginRegisterCliente from "../pages/LoginRegisterCliente/LoginRegisterCliente";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import ModalAvaliacao from "../components/Modal/ModalAvaliacao";
import ModalServico from "../components/Modal/ModalServico";
import ModalValidacao from "../components/Modal/ModalValidacao";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManualAppointment from "../pages/AgendamentoCliente/ManualAppointment";
import ManualAppointmentAdmin from "../pages/AgendamentoComerciante/ManualAppointmentAdmin";
import PerfilComerciante from "../pages/PerfilComerciante/PerfilComerciante";
import PerfilCliente from "../pages/PerfilCliente/PerfilCliente";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login-register-user-admin" element={<LoginRegisterComerciante />} />
                <Route path="/login-register-user" element={<LoginRegisterCliente />} />
                <Route path="/ModalAvaliacao" element={<ModalAvaliacao />} />
                <Route path="/ModalServico" element={<ModalServico />} />
                <Route path="/ModalValidacao" element={<ModalValidacao />} />
                <Route path="/manual-appointment" element={<ManualAppointment />} />
                <Route path="/manual-appointment-admin" element={<ManualAppointmentAdmin />} />
                <Route path="/merchant-profile" element={<PerfilComerciante />} />
                <Route path="/client-profile" element={<PerfilCliente />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;