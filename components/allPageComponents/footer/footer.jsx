import React from "react";
import Logo from "./assets/footerLogo.svg";
import TwitterLogo from "./assets/twitter.svg";
import FacebookLogo from "./assets/facebook.svg";
import TikTokLogo from "./assets/tiktok.svg";
import InstagramLogo from "./assets/instagram.svg";
import { Link } from 'react-router-dom';

const footer = () => {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="footer-info">
                        <div className="footer-logo-text">
                            <Link to="/"><img src={Logo} alt="logo" /></Link>
                            <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
                        </div>
                        <div className="footer-navigation">
                            <div className="navigation-section">
                                <h3>Services</h3>
                                <p>Bonus program</p>
                                <p>Gift cards</p>
                                <p>Credit and payment</p>
                                <p>Service contracts</p>
                                <p>Non-cash account</p>
                                <p>Payment</p>
                            </div>
                            <div className="navigation-section">
                                <h3>Assistance to the buyer</h3>
                                <p>Find an order</p>
                                <p>Terms of delivery</p>
                                <p>Exchange and return of goods</p>
                                <p>Guarantee</p>
                                <p>Frequently asked questions</p>
                                <p>Terms of use of the site</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-social-icons">
                        <img src={TwitterLogo} alt="logo" />
                        <img src={FacebookLogo} alt="logo" />
                        <img src={TikTokLogo} alt="logo" />
                        <img src={InstagramLogo} alt="logo" />
                    </div>
                </div>
            </footer>
        </>
    )
};

export default footer;
