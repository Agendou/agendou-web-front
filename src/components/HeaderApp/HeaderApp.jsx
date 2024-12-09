import React from 'react';
import { FaBell } from 'react-icons/fa';
import styles from './HeaderApp.module.css';

const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={styles.headerIcons}>
        {/* <FaBell className={styles.notificationIcon} /> */}
      </div>
    </div>
  );
};

export default Header;