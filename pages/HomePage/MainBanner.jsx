import React from "react";
import ShopButton from "../../components/shopNowButton.jsx";
import IphoneImage from "./image/bannerIphone.svg"

const MainBanner = () => {
    return (
        <>
            <div className="main-banner">
                <div className="main-banner-content">
                    <div className="main-banner-title">
                        <h4>Pro.Beyond.</h4>
                        <h1>Iphone 14 <span>Pro</span></h1>
                    </div>
                    <div className="main-banner-text">
                        <p>Created to change everything for the better. For everyone</p>
                        <ShopButton />
                    </div>
                </div>
                <img src={IphoneImage} alt="image bulunamadi." />
            </div>
        </>
    )
};

export default MainBanner;
