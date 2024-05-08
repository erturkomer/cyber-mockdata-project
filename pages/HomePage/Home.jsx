import React from "react";
import MainBanner from "./Banners/MainBanner.jsx"
import HomeCategories from "./HomeCategories.jsx";
import HomeProducts from "./HomeProducts.jsx";
import MiddleBanner from "./Banners/MiddleBanner.jsx";

const Home = () => {
  return (
    <>
      <MainBanner />
      <HomeCategories />
      <HomeProducts />
      <MiddleBanner />
    </>
  )
};

export default Home;