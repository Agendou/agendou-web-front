import React from "react";
import Header from "../../components/Header/Header"
import Start from "../../components/LandingPage/Start/Start";
import Features from "../../components/LandingPage/WhoCanUse/WhoCanUse";
import Benefits from "../../components/LandingPage/Features/Features"
import Use from "../../components/LandingPage/Use/Use";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header/>
      <Start/>
      <Features/>
      <Benefits/>
      <Use/>
      <Footer/>
    </>
  );
};
export default Home;
