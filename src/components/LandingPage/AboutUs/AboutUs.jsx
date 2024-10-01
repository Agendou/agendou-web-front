import React from "react";
import style from "./AboutUs.module.css"
import img from "../../../assets/images/image 2.png"

const AboutUs = () => {
    return (
        <section className={style["section"]}>
            <div className={style["left-container"]}>
                <div className={style["left-title-box"]}>
                    <h1>SOBRE NÓS</h1>
                    <h2 className={style["left-subtitle"]}>Solução Inteligente</h2>
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
            </div>
            <div className={style["right-container"]}>
                <div className={style["words-container"]}>
                    <div className={style["right-title-box"]}>
                        <h1>AGENDOU É SIMPLES!</h1>
                        <h2>O Software que trabalha com você!</h2>
                    </div>
                    <div className={style["paragraph-box"]}>
                        <p>É a solução definitiva para empresas e equipes que buscam praticidade na organização do dia a dia. </p>
                        <p>O AGENDOU foi criado para trazer eficiência e tranquilidade para sua empresa, com um agendamento simplificado para o seu negócio!</p>
                    </div>
                    <div className={style["button-container"]}>
                        <a href="#"><button className={`btn ${style.button}`}>SAIBA MAIS</button></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;