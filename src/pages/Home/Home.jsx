import React from "react";
import Header from "../../components/Header/Header"
import Start from "../../components/LandingPage/Start/Start";
import Features from "../../components/LandingPage/WhoCanUse/WhoCanUse";
import Benefits from "../../components/LandingPage/Features/Features"
import AboutUs from "../../components/LandingPage/AboutUs/AboutUs";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header/>
      <Start/>
      <Features/>
      <Benefits/>
      <AboutUs/>
      <Footer/>
    </>
  );
};
export default Home;
