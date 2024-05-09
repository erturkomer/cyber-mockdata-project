import React, { useState, useEffect } from "react";
import ShopButton from "../../../components/shopNowButton.jsx";
import Img1 from "./image/big/img1.svg";
import Img2 from "./image/big/img2.svg";
import Img3 from "./image/big/img3.svg";
import Img4 from "./image/big/img4.svg";
import Img5 from "./image/big/img5.svg";

const BottomBigBanner = () => {
    return (
        <>
            <div className="bottom-big-banner-container">
                <img src={Img1} alt="" style={{ position: "relative", left: "223px", top: "0" }} />
                <img src={Img2} alt="" style={{ position: "absolute", left: "4%", zIndex: "100" }} />
                <img src={Img3} alt="" style={{ position: "absolute", left: "0", top: "569%" }} />
                <img src={Img4} alt="" style={{ position: "absolute", left: "88%", top: "546%" }} />
                <img src={Img5} alt="" style={{ position: "absolute", left: "73.7%", top: "578.8%" }} />
                <div className="big-banner-text-container">
                    <div className="big-banner-title">
                        <h1>Big Summer <span>Sale</span></h1>
                        <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
                    </div>
                    <ShopButton border="white" color="white" />
                </div>
            </div>
        </>
    )
};

export default BottomBigBanner;
