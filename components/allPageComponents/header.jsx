import React from "react";
import Logo from "./jsxSvg/logo.jsx";
import FavoriteIcon from "./jsxSvg/favorites.svg";
import CartIcon from "./jsxSvg/cart";
import UserIcon from "./jsxSvg/user";
import SearchBox from "../searchBox.jsx"

import { Link, useLocation } from 'react-router-dom';

const header = () => {
    const location = useLocation();
    return (
        <header>
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <SearchBox />
                <div className="pages-link">
                    <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={location.pathname === "/about" ? "active" : ""}>
                            <Link to="/about">About</Link>
                        </li>
                        <li className={location.pathname === "/contact" ? "active" : ""}>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className={location.pathname === "/blog" ? "active" : ""}>
                            <Link to="/blog">Blog</Link>
                        </li>
                    </ul>
                </div>
                <div className="header-icons">
                    <img src={FavoriteIcon} alt="icon bulunamadi" />
                    <CartIcon />
                    <UserIcon />
                </div>
            </div>
        </header>
    )
};

export default header;