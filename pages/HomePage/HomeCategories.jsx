import React from "react";
import Category from "./Category";
import LeftArrow from "./icons/leftArrow.svg"
import RightArrow from "./icons/rightArrow.svg"
import Phones from "./icons/phone.svg"
import SmartWatches from "./icons/smartWatches.svg"
import Cameras from "./icons/cameras.svg"
import HeadPhones from "./icons/headPhones.svg"
import Computers from "./icons/computers.svg"
import Gaming from "./icons/gaming.svg"
import { Link, useLocation } from 'react-router-dom';

const HomeCategories = () => {
  return (
    <>
      <div className="home-categories-container">
        <div className="top-categories">
          <h3>Browse By Category</h3>
          <div className="arrow-button-container">
            <button className="left-Arrow">
              <img src={LeftArrow} alt="icon bulunamadi." />
            </button>
            <button className="right-Arrow">
              <img src={RightArrow} alt="icon bulunamadi." />
            </button>
          </div>
        </div>
        <div className="home-categories">
          <Link to="/catalog/smartphones" style={{ textDecoration: "none", color:"black" }}>
            <Category name="Phones" icon={Phones} />
          </Link>
          <Category name="Smart Watches" icon={SmartWatches} />
          <Category name="Cameras" icon={Cameras} />
          <Category name="Headphones" icon={HeadPhones} />
          <Category name="Computers" icon={Computers} />
          <Category name="Gaming" icon={Gaming} />
        </div>
      </div>
    </>
  )
};

export default HomeCategories;
