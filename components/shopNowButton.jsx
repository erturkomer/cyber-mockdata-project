import React from "react";

const shopNowButton = (props) => {
  return (
    <>
      <div className="shop-now-button" style={{ border: `1px solid ${props.border}`, color: props.color}}>
        Shop Now
      </div>
    </>
  )
};

export default shopNowButton;
