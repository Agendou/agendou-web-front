import React from "react";
import styles from "./Header.module.css"
import logo from "../../assets/images/LightLogo.png"

const Header = () => {
    return (
      <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Agendou Logo" />
      </div>
      <nav>
        <ul className={styles.navList}>
          <div>
            <li><a href="#solucao" className={styles.navText}>Quem pode usar</a></li>
            <li><a href="#recursos" className={styles.navText}>Recursos</a></li>
            <li><a href="#vantagens" className={styles.navText}>Vantagens</a></li>
            <li><a href="#depoimentos" className={styles.navText}>Sobre nós</a></li>
        </div>
          <div>
            <li><a href="#experimente" className={styles.experimente}>EXPERIMENTE</a></li>
            <li><a href="#login" className={styles.login}>LOGIN</a></li>
          </div>
        </ul>
      </nav>
    </header>
    );
  };
  
  export default Header;