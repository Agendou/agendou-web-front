import React from "react";
import Header from "../../components/Header/Header"
import Start from "../../components/LandingPage/Start/Start";
import Solution from "../../components/LandingPage/WhoCanUse/Solution";
import Benefits from "../../components/LandingPage/Benefits/Benefits"
import Use from "../../components/LandingPage/Use/Use";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header/>
      <Start/>
      <Solution/>
      <Benefits/>
      <Use/>
      <Footer/>
    </>
  );
};
export default Home;
