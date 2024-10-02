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
        <div className={`container ${isLogin ? 'login-mode' : 'register-mode'}`}>
            <div className="forms">
                {isLogin ? <FormLogin /> : <FormRegister />}
            </div>
            <AuthPanel isLogin={isLogin} switchForm={switchForm} />
        </div>
    );
};

export default LoginRegister;
