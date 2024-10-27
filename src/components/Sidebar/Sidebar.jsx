import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; 
import logo from '../../assets/images/Logo Branca.png';
import googleAnalyticsIcon from '../../assets/images/analitica-do-google.png';
import employeesIcon from '../../assets/images/employees.png';
import agendaIcon from '../../assets/images/agenda.png';
import addIcon from '../../assets/images/adicionar.png';
import userIcon from '../../assets/images/do-utilizador.png';
import exitIcon from '../../assets/images/exit.png';
import perfilDash from '../../assets/images/profile.png';

const Sidebar = ({ isVisible }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(isVisible);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        &#9776;
      </button>
      <div className={`sidebar ${isSidebarVisible ? '' : 'reduced'}`}>
        {isSidebarVisible && (
          <>
            <div className="logo">
              <img src={logo} alt="Logotipo Agendou" className="logo" />
            </div>
            <div className="user-info">
              <img src={perfilDash} alt="Foto de Perfil" className="profile-pic" />
              <p>Humberto Silva</p>
            </div>
            <hr />
            <div className="menu-section">
              <h3>Geral</h3>
              <ul>
                <li>
                  <Link to="/dashboard">
                    <img src={googleAnalyticsIcon} alt="Painel Geral" className="menu-icon" /> Painel Geral
                  </Link>
                </li>
                <li>
                  <Link to="/profile-profissional">
                    <img src={employeesIcon} alt="Painel de Funcionários" className="menu-icon" /> Painel de Funcionários
                  </Link>
                </li>
                <li>
                  <Link to="/appointments">
                    <img src={agendaIcon} alt="Agendamentos" className="menu-icon" /> Agendamentos
                  </Link>
                </li>
              </ul>
            </div>
            <hr />
            <div className="menu-section">
              <h3>Gerenciamento</h3>
              <ul>
                <li>
                  <Link to="/profile-profissional">
                    <img src={employeesIcon} alt="Funcionários" className="menu-icon" /> Funcionários
                  </Link>
                </li>
                <li>
                  <Link to="/schedule">
                    <img src={addIcon} alt="Agenda" className="menu-icon" /> Agenda
                  </Link>
                </li>
              </ul>
            </div>
            <hr />
            <div className="menu-section">
              <h3>Conta</h3>
              <ul>
                <li>
                  <Link to="/profile">
                    <img src={userIcon} alt="Perfil" className="menu-icon" /> Perfil
                  </Link>
                </li>
              </ul>
            </div>
            <div className="logout">
              <button onClick={handleLogout}>
                <img src={exitIcon} alt="Sair" className="menu-icon" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;