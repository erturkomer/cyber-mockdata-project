import React from "react";
import Banner from "./MainBanner.jsx"
import HomeCategories from "./HomeCategories.jsx";
import HomeProducts from "./HomeProducts.jsx";

const Home = () => {
  return (
    <>
      <Banner />
      <HomeCategories />
      <HomeProducts />
    </>
  )
};

export default Home;