import React from "react";
import MainBanner from "./Banners/MainBanner.jsx"
import HomeCategories from "./HomeCategories.jsx";
import HomeProducts from "./HomeProducts.jsx";
import MiddleBanner from "./Banners/MiddleBanner.jsx";
import DiscountedProducts from "./DiscountedProducts.jsx";
import BottomBigBanner from "./Banners/BottomBigBanner.jsx";

const Home = () => {
  return (
    <>
      <MainBanner />
      <HomeCategories />
      <HomeProducts />
      <MiddleBanner />
      <DiscountedProducts />
      <BottomBigBanner />
    </>
  )
};

export default Home;