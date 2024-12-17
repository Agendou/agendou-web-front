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
import { useEffect } from 'react';

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem('user');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className={`sidebar ${isSidebarVisible ? '' : 'reduced'}`}>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        &#9776;
      </button>
      {isSidebarVisible && (
        <>
          <div className="logo">
            <img src={logo} alt="Logotipo Agendou" className="logo" />
          </div>
          <div className="user-info">
            <img src={perfilDash} alt="Foto de Perfil" className="profile-pic" />
            <p>{ userName || 'user'}</p>
          </div>
          <hr />
          <div className="menu-section">
            <h3>Agendamento</h3>
            {/* <hr /> */}
            <ul>
              <li>
                <Link to="/manual-appointment">
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
                <Link to="/client-profile">
                  <img src={userIcon} alt="Perfil" className="menu-icon" /> Perfil
                </Link>
              </li>
            </ul>
          </div>
          <div className="logout">
            <button onClick={handleLogout}>
              <img src={exitIcon} alt="Sair" className="menu-icon" /> Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
