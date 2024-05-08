import React from "react";
import FavoriteIcon from "../jsxSvg/favorites.svg";
import BuyNowButton from "./buyNowButton";

const product = (props) => {
    return (
        <>
            <div className="product-card">
                <div className="between-icon-favorites">
                    <FavoriteIcon />
                </div>
                <img src={props.image} alt="image bulunamadi." />
                <div className="product-text-button">
                    <div className="product-info">
                        <p>{props.name} {props.storage} {props.color}</p>
                        <h2>{props.price}</h2>
                    </div>
                    <BuyNowButton />
                </div>
            </div>
        </>
    )
};

export default product;
