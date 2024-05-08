import React from "react";
import ShopNowButton from "../../../components/shopNowButton";

const OneMiddle = (props) => {
    return (
        <>
            <div className="middle-banner-card" style={{background: props.background}}>
                <img src={props.image} alt="middle-banner-card-img" />
                <div className="middle-banner-card-text">
                    <h3 style={{color: props.color}}>{props.title}</h3>
                    <p>{props.text}</p>
                    <ShopNowButton  border={props.border} color={props.color}  />
                </div>
            </div>
        </>
    )
};

export default OneMiddle;
