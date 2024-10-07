import React from "react";
import styles from "./Features.module.css";
import { DeviceMobile } from "@phosphor-icons/react";

const Features = () => {
  return (
    <section id="features" className={styles["section"]}>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h1>Recursos</h1>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.iconBorder}>
              <div>
                <DeviceMobile size={64} color="#010726" />
              </div>
            </div>
            <div className={styles.cardText}>
              <h2>Agendamento Online</h2>
              <p>
                Clientes podem agendar visitas facilmente pelo nosso sistema,
                sem necessidade de contato direto.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.iconBorder}>
              <div>
                <DeviceMobile size={64} color="#010726" />
              </div>
            </div>
            <div className={styles.cardText}>
              <h2>Agendamento Online</h2>
              <p>
                Clientes podem agendar visitas facilmente pelo nosso sistema,
                sem necessidade de contato direto.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.iconBorder}>
              <div>
                <DeviceMobile size={64} color="#010726" />
              </div>
            </div>
            <div className={styles.cardText}>
              <h2>Agendamento Online</h2>
              <p>
                Clientes podem agendar visitas facilmente pelo nosso sistema,
                sem necessidade de contato direto.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.iconBorder}>
              <div>
                <DeviceMobile size={64} color="#010726" />
              </div>
            </div>
            <div className={styles.cardText}>
              <h2>Agendamento Online</h2>
              <p>
                Clientes podem agendar visitas facilmente pelo nosso sistema,
                sem necessidade de contato direto.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.iconBorder}>
              <div>
                <DeviceMobile size={64} color="#010726" />
              </div>
            </div>
            <div className={styles.cardText}>
              <h2>Agendamento Online</h2>
              <p>
                Clientes podem agendar visitas facilmente pelo nosso sistema,
                sem necessidade de contato direto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
