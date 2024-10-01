import React from "react";
import style from "./Header.module.css"
import '../../styles/buttons.css'
import logo from "../../assets/images/LightLogo.png"

const Header = () => {
    return (
      <header className={style["header"]}>
        <div className={style["logo"]}>
          <img src={logo} alt="Agendou com um relógio no lugar do O" />
        </div>
        <nav className={style["navigation"]}>
          <ul>
            <li><a href="#inicio">INÍCIO</a></li>
            <li><a href="#about-us">SOBRE NÓS</a></li>
            <li><a href="#benefits">BENEFÍCIOS</a></li>
            <li><a href="#use">COMO UTILIZAR</a></li>
          </ul>
        </nav>
        <div className={style["auth-buttons"]}>
          <a href="#"><button className={`btn transparentBtn ${style.login}`}>ENTRAR</button></a>
          <a href="#"><button className={`btn blueBtn ${style.register}`}>REGISTRAR-SE</button></a>
        </div>
      </header>
    );
  };
  
  export default Header;