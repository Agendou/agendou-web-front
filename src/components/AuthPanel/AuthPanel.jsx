import React from "react";
import styles from './AuthPanel.module.css';

const AuthPanel = ({
    isLogin,
    switchForm,
    titleLogin,
    titleRegister,
    messageLogin,
    messageRegister,
    buttonTextLogin,
    buttonTextRegister
}) => {
    return (
        <div className={`${styles["container"]} ${isLogin ? styles["loginPanel"] : styles["registerPanel"]}`}>
            <div className={styles["leftPanel"]}>
                {isLogin ? (
                    <>
                        <h2>{titleLogin}</h2>
                        <p>{messageLogin}</p>
                        <button onClick={switchForm} className={styles["button"]}>
                            {buttonTextRegister}
                        </button>
                    </>
                ) : (
                    <>
                        <h2>{titleRegister}</h2>
                        <p>{messageRegister}</p>
                        <button onClick={switchForm} className={styles["button"]}>
                            {buttonTextLogin}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPanel;
