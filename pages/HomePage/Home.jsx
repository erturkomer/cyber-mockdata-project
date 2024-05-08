import React from "react";
import Header from "../../components/allPageComponents/header.jsx";
import Banner from "./MainBanner.jsx"
import HomeCategories from "./HomeCategories.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <HomeCategories />
    </>
  )
};

export default Home;