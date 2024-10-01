import React from "react";
import Header from "../../components/Header/Header"
import Start from "../../components/LandingPage/Start/Start";
import AboutUs from "../../components/LandingPage/AboutUs/AboutUs";
import Benefits from "../../components/LandingPage/Benefits/Benefits"
import Use from "../../components/LandingPage/Use/Use";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header/>
      <Start/>
      <AboutUs/>
      <Benefits/>
      <Use/>
      <Footer/>
    </>
  );
};
export default Home;
