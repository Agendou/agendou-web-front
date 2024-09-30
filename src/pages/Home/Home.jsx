import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header"

const Home = () => {
  return (
    <>
      <Header/>
      <section className={styles["section-01"]}>
        <h1>Otimize seu tempo, maximize o seu potencial.</h1>
        <h2>Agilize seus agendamentos, organize seu comércio e conquiste mais clientes com a simplicidade que você sempre quis.</h2>
        
      </section>
    </>
  );
};
export default Home;
