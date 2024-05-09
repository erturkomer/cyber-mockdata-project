import React from "react";
import { Link, useLocation } from 'react-router-dom';

const shopNowButton = (props) => {
  return (
    <>
    <Link to="/catalog/smartphones" style={{textDecoration:"none"}}>
      <div className="shop-now-button" style={{ border: `1px solid ${props.border}`, color: props.color}}>
        Shop Now
      </div>
      </Link>
    </>
  )
};

export default shopNowButton;
