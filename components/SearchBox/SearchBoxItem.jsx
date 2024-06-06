import React from "react";

const SearchBoxItem = ({ id, name, image, color, price, brand, onProductClick, storage, battery, screenSize }) => {
  const handleClick = () => {
    onProductClick(id);
  };
  return (
    <>
      <div className="search-box-item" onClick={handleClick}>
        <div className="search-boxs">
          <div className="search-box-image">
            <img style={{ width: "50px" }} src={image} alt="" />
          </div>
          <div className="search-box-info">
            <span><b>{brand}</b> {name} {storage}</span>
              <span>{battery} {color}</span>
          </div>
        </div>
        <span style={{ fontSize: "14px" }}>${price}</span>
      </div>
    </>
  )
};

export default SearchBoxItem;
