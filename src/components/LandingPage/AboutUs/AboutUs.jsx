import React from "react";
import style from "./AboutUs.module.css"
import img from "../../../assets/images/image 2.png"

const AboutUs = () => {
    return (
        <section className={style["section"]}>
            <div className={style["left-container"]}>
                <div>
                    <h1>SOBRE NÓS</h1>
                    <h2 className={style["left-subtitle"]}>Solução Inteligente</h2>
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
            </div>
            <div className={style["right-container"]}>
                <p>Sabemos que cada segundo importa no seu negócio, e é por isso que nosso software vai revolucionar a forma como você trabalha!</p>
                <h1>AGENDOU É SIMPLES!</h1>
                <h2>O Software que trabalha com você!</h2>
                <p>É a solução definitiva para empresas e equipes que buscam praticidade na organização do dia a dia. </p>
                <p>O AGENDOU foi criado para trazer eficiência e tranquilidade para sua empresa, com um agendamento simplificado para o seu negócio!</p>
                <a href="#"><button className={`btn ${style.button}`}>SAIBA MAIS</button></a>
            </div>
        </section>
    )
}

export default AboutUs;