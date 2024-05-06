import React from "react";
import SearchIcon from "./allPageComponents/svg/searchIcon.jsx";

const searchBox = () => {
    return (
        <>
            <div className="search-box-container">
                <SearchIcon />
                <input type="text" placeholder="Search" />
            </div>
        </>
    )
};

export default searchBox;