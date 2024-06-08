import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhonesIcon from "./icons/phone.svg";
import SmartWatchesIcon from "./icons/smartWatches.svg";
import CamerasIcon from "./icons/cameras.svg";
import HeadphonesIcon from "./icons/headPhones.svg";
import ComputersIcon from "./icons/computers.svg";
import GamingIcon from "./icons/gaming.svg";
import LeftArrowIcon from "./icons/leftArrow.svg";
import RightArrowIcon from "./icons/rightArrow.svg";

const HomeCategories = () => {
  const [startIndex, setStartIndex] = useState(0);
  const categories = [
    "Phones",
    "Smart Watches",
    "Cameras",
    "Headphones",
    "Computers",
    "Gaming",
    "TV & Video",
    "Tablets",
    "Printers",
    "Home Appliances",
    "Fitness Trackers",
    "Drones"
  ]; 
  const categoriess = [
    "smartphones",
    "smartwatches",
    "cameras",
    "headphones",
    "computers",
    "gaming",
    "tv-video",
    "tablets",
    "printers",
    "home-appliances",
    "fitness-trackers",
    "drones"
  ];
  const icons = [
    PhonesIcon,
    SmartWatchesIcon,
    CamerasIcon,
    HeadphonesIcon,
    ComputersIcon,
    GamingIcon,
    ComputersIcon,
    SmartWatchesIcon,
    PhonesIcon,
    CamerasIcon,
    HeadphonesIcon,
    HeadphonesIcon
  ];
  const visibleCategories = 6;

  const handleScrollRight = () => {
    if (startIndex + visibleCategories < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleScrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="home-categories-container">
      <div className="top-categories">
        <h3>Browse By Category</h3>
        <div className="arrow-button-container">
          <button className="left-Arrow" onClick={handleScrollLeft} style={{ cursor: "pointer" }}>
            <img src={LeftArrowIcon} alt="Left Arrow" />
          </button>
          <button className="right-Arrow" style={{ cursor: "pointer" }} onClick={handleScrollRight}>
            <img src={RightArrowIcon} alt="Right Arrow" />
          </button>
        </div>
      </div>
      <div className="home-categories">
        {categoriess.slice(startIndex, startIndex + visibleCategories).map((category, index) => (
          <Link
            key={index}
            to={`/catalog/${category}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="home-category-card">
              <img src={icons[startIndex + index]} alt={categories[startIndex + index]} />
              <p>{categories[startIndex + index]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
