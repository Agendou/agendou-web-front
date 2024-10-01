import React from "react"
import style from './Start.module.css'
import img from '../../../assets/images/image 1.png'
import arrow from '../../../assets/images/arrow.png'

const Start = () => {
    return (
        <section className={style["section"]}>
            <div className={style["words-box"]}>
                <h1 className={style["title"]}><span className={style["blueColor"]}>Otimize</span> seu tempo, maximize o seu <span className={style["blueColor"]}>potencial</span>.</h1>
                <p className={style["subtitle"]}>Agilize seus agendamentos, organize seu comércio e conquiste mais clientes com a simplicidade que você sempre quis.</p>
                <div className={style["button-box"]}>
                    <a href="#"><button className={`btn blueBtn ${style.button}`}>EXPERIMENTE GRATUITAMENTE</button></a>
                    <a href="#"><img className={style["arrow"]} src={arrow} alt="Seta para a direita" /></a>
                </div>
            </div>
            <div className={style["img-box"]}>
                <img className={style["img01"]} src={img} alt="Ilustração de um relógio, uma agenda e um calendário, tom azul brilhante." />
            </div>
        </section>
    )
}

export default Start;