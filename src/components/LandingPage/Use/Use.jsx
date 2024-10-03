import React from "react";
import styles from "./Use.module.css";
import arrow from "../../../assets/images/arrow.png"

const Use = () => {
  return (
    <div id="use" className={styles.container}>
      <h2 className={styles.title}>Como Utilizar</h2>
      <p className={styles.subtitle}>Em 4 passos</p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.circle}>01</div>
          <div className={styles.text}>
              <h3>Crie sua conta!</h3>
              <p>Garanta a segurança de suas informações.</p>
          </div>
        </div>

        <div>
            <img src={arrow} alt="Seta para direita"/>
        </div>
        <div className={styles["backcircle"]}>
          <div className={styles.step}>
            <div className={styles.circle}>02</div>
            <div className={styles.text}>
                <h3>Explore os serviços</h3>
                <p>Escolha os serviços disponíveis personalizáveis.</p>
            </div>
          </div>
        </div>

        <div>
            <img src={arrow} alt="Seta para direita"/>
        </div>
        <div className={styles.step}>
          <div className={styles.circle}>03</div>
          <div className={styles.text}>
              <h3>Selecione a data e horário perfeitos</h3>
              <p>O momento ideal é você quem faz!</p>
          </div>
        </div>

        <div>
            <img src={arrow} alt="Seta para direita"/>
        </div>
        <div className={styles.step}>
          <div className={styles.circle}>04</div>
          <div className={styles.text}>
              <h3>Confirmação instantânea!</h3>
              <p>Notificações ágeis, relaxa que estamos no controle!</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Use;
