import LoginRegisterComerciante from "../pages/LoginRegisterComerciante/LoginRegisterComerciante";
import LoginRegisterCliente from "../pages/LoginRegisterCliente/LoginRegisterCliente";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard"; 
import ProfileProfissional from "../pages/ProfileProfissional/ProfileProfissional";
import ModalAvaliacao from "../components/Modal/ModalAvaliacao";
import ModalServico from "../components/Modal/ModalServico";
import ModalValidacao from "../components/Modal/ModalValidacao";

<BrowserRouter>
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
                <Route path="/ModalAvaliacao" element={<ModalAvaliacao />} />
                <Route path="/ModalServico" element={<ModalServico />} />
                <Route path="/ModalValidacao" element={<ModalValidacao />} />
            </Routes>
        </BrowserRouter>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;