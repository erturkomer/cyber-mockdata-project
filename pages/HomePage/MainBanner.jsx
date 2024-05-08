import React, { useState, useEffect } from "react";
import ShopButton from "../../components/shopNowButton.jsx";
import IphoneImage from "./image/bannerIphone.svg";
import PlayStation from "./image/bannerPlayStation.svg";
import Airpods from "./image/bannerAirpods.svg";
import AppleVision from "./image/bannerAppleVision.svg";
import Mackbook from "./image/bannerMackbook.svg";

const MainBanner = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Sayfa scroll edildiğinde bu fonksiyon çalışacak
        const handleScroll = () => {
            // Eğer scroll pozisyonu 30 piksel aşağı inerse resimlerin görünmesini sağlayacak sınıfı ekleyelim
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Sayfa scroll event listenerını ekleyelim
        window.addEventListener("scroll", handleScroll);

        // bileşen unmount edildiğinde event listeneri kaldıralım
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                        <ShopButton border="white" color="white" />
                    </div>
                </div>
                <img src={IphoneImage} alt="image bulunamadi."/>
            </div>
            <div className="smaller-banners">
                <div className="left-banners">
                    <div className="wide-square">
                        <img src={PlayStation} alt="image bulunamadi."/>
                        <div className="banner-wide-square-title-text">
                            <h1>Playstation 5</h1>
                            <p>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
                        </div>
                    </div>
                    <div className="squares-banner">
                        <div className="square-banner left-bottom-bn-1">
                            <img src={Airpods} alt="image bulunamadi."/>
                            <div className="banner-square-title-text">
                                <h1>Apple AirPods <span>Max</span></h1>
                                <p>Computational audio. Listen, it's powerful</p>
                            </div>
                        </div>
                        <div className="square-banner left-bottom-bn-2">
                            <img src={AppleVision} alt="image bulunamadi." />
                            <div className="banner-square-title-text">
                                <h1>Apple <br /> Vision <span>Pro</span></h1>
                                <p>An immersive way to experience entertainment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="big-banner">
                    <div className="big-banner-content">
                        <div className="big-banner-title-text">
                            <h1>Macbook <span>Air</span></h1>
                            <p>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
                        </div>
                        <ShopButton border="black" color="black" gap="8px" />
                    </div>
                    <img src={Mackbook} alt="image bulunamadi." className={`${scrolled ? "img-animation" : ""}`}/>
                </div>
            </div>
        </>
    );
};

export default MainBanner;