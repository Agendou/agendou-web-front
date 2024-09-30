import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header"

const Home = () => {
  return (
    <>
      <Header/>
      <div className={styles["teste"]}>Testando</div>
    </>
  );
};
export default Home;
