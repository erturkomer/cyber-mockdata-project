import React from "react";
import FavoriteIcon from "../jsxSvg/favorite.svg";
import BuyNowButton from "./buyNowButton";
import { Link } from 'react-router-dom';

const Product = (props) => {
    return (
        <>
            <div className="product-card">
                <div className="between-icon-favorites">
                    <img src={FavoriteIcon} alt="" />
                </div>
                <Link to={`/catalog/smartphones/productdetails/${props.id}`}>
                    <img src={props.image} alt="image bulunamadi." />
                </Link>
                <div className="product-text-button">
                    <div className="product-info">
                        <p>{props.name} {props.storage} {props.color}  {props.mainCamera} {props.cpu}</p>
                        <h2>{props.price}</h2>
                    </div>
                    <BuyNowButton />
                </div>
            </div>
        </>
    )
};

export default Product;