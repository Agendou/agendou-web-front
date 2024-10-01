import React from "react";
import styles from "./Benefits.module.css"
import calendar from "../../../assets/images/calendar.png"
import clock from "../../../assets/images/clock.png"
import dashboard from "../../../assets/images/dashboard.png"

const Benefits = () => {
    return (
        <section>
            <div className={styles["title-container"]}>
                <h1>BENEFÍCIOS</h1>
                <h2>Nossos impactos no seu negócio!</h2>
            </div>
            <div>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <img src={calendar} alt="Agendamento Simplificado" className={styles.icon} />
                        <h3>AGENDAMENTO SIMPLIFICADO</h3>
                        <p>Agendamento com poucos cliques: A simplicidade que você merece!</p>
                        <button className={styles.button}>SAIBA MAIS</button>
                    </div>

                    <div className={styles.card}>
                        <img src={clock} alt="Gestão de Horários" className={styles.icon} />
                        <h3>GESTÃO DE HORÁRIOS</h3>
                        <p>Domine sua agenda: Gestão de horários, deixe que tomamos conta disso para você!</p>
                        <button className={styles.button}>SAIBA MAIS</button>
                    </div>

                    <div className={styles.card}>
                      <img src={dashboard} alt="Visão de Desempenho" className={styles.icon} />
                      <h3>VISÃO DE DESEMPENHO</h3>
                      <p>Desempenho dinâmico e na palma da mão: Insights poderosos em tempo real!</p>
                      <button className={styles.button}>SAIBA MAIS</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Benefits;