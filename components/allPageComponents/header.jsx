import React from "react";
import Logo from "./jsxSvg/logo.jsx";
import FavoriteIcon from "./jsxSvg/favorites.svg";
import Cart from "./jsxSvg/cart";
import UserIcon from "./jsxSvg/user";
import SearchBox from "../SearchBox/searchBox.jsx";
import { Link, useLocation } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

const Header = ({ cartCount }) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userDetails");
    };

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
                            <Link to="/">Home</Link>{" "}
                        </li>
                        <li className={location.pathname === "/about" ? "active" : ""}>
                            <Link to="/about">About</Link>
                        </li>
                        <li className={location.pathname === "/contact" ? "active" : ""}>
                            <Link to="/contact">Contact Us</Link>{" "}
                        </li>
                        <li className={location.pathname === "/blog" ? "active" : ""}>
                            <Link to="/blog">Blog</Link>
                        </li>
                    </ul>
                </div>
                <div className="header-icons">
                    <Link to="/favorites">
                        <img src={FavoriteIcon} alt="Favorite Icon" />
                    </Link>
                    <Cart cartCount={cartCount} />
                    <div className="user-icon-container">
                        {isLoggedIn ? (
                            <>
                                <UserIcon />
                                <div className="user-menu">
                                    <Link
                                        to="/userinformation"
                                        style={{ gap: "8px", display: "flex", alignItems: "center" }}
                                    >
                                        <RiUserSettingsLine />
                                        My user information
                                    </Link>
                                    <Link
                                        onClick={handleLogout}
                                        to="/login"
                                        style={{ gap: "8px", display: "flex", alignItems: "center" }}
                                    >
                                        <IoLogOutOutline />
                                        Logout
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                style={{ gap: "8px", display: "flex", alignItems: "center" }}
                            >
                                <UserIcon />
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
