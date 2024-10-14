import React, { useState } from "react";
import FormLogin from '../../components/FormLogin/FormLogin';
import FormRegister from '../../components/FormRegister/FormRegister';
import AuthPanel from '../../components/AuthPanel/AuthPanel';
import styles from './LoginRegister.module.css';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={`${styles.container} ${isLogin ? '' : styles.registerMode}`}>
            {isLogin ? (
                <>
                    <div className={styles["leftPanel"]}>
                        <FormLogin />
                    </div>
                    <div className={styles["rightPanel"]}>
                        <AuthPanel isLogin={isLogin} switchForm={switchForm} />
                    </div>
                </>
            ) : (
                <>
                    <div className={styles["leftPanel"]}>
                        <AuthPanel isLogin={isLogin} switchForm={switchForm} />
                    </div>
                    <div className={styles["rightPanel"]}>
                        <FormRegister />
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginRegister;


