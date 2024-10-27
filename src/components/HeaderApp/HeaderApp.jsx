import React from 'react';
import { FaBell } from 'react-icons/fa';
import perfilDash from '../../assets/images/perfilDash.png';
import styles from './HeaderApp.module.css';

const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={styles.headerIcons}>
        <FaBell className={styles.notificationIcon} />
        {/* <img src={perfilDash} alt="Foto de Perfil" className={styles.profilePic} /> */}
      </div>
    </div>
  );
};

export default Header;