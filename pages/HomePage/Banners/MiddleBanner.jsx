import React from "react";
import OneMiddle from "./oneMiddle.jsx";
import PopularProducts from "./image/popularProducts.svg";
import IpadPro from "./image/ipadPro.svg";
import Samsung from "./image/samsung.svg";
import Mackbook from "./image/macbook.svg";

const MiddleBanner = () => {
  return (
    <>
      <div className="middle-banner-container">
        <OneMiddle border="black" color="black" background="#FFFFFF" image={PopularProducts} title="Popular Products" text="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use." />
        <OneMiddle border="black" color="black" background="#F9F9F9" image={IpadPro} title="Ipad Pro" text="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use." />
        <OneMiddle border="black" color="black" background="#EAEAEA" image={Samsung} title="Samsung Galaxy" text="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use." />
        <OneMiddle border="white" color="white" background="#2C2C2C" image={Mackbook} title="Macbook Pro" text="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use." />
      </div>
    </>
  )
};

export default MiddleBanner;
