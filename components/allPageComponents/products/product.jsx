import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import FavoriteIconEmpty from "../jsxSvg/emptyHeart.svg";
import { ToastContainer, toast } from "react-toastify";
import FavoriteIconFilled from "../jsxSvg/filledHeart.svg";
import BuyNowButton from "./buyNowButton";
import { Link } from "react-router-dom";

const Product = (props) => {
  const productId = props.id;

  const [isFavorite, setIsFavorite] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites)[productId] || false : false;
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};
    favorites[productId] = isFavorite;
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [isFavorite, productId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      toast.success("Added to favorites", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Removed from favorites!", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="between-icon-favorites">
          {isFavorite ? (
            <img src={FavoriteIconFilled} alt="Favorite" onClick={handleFavoriteClick} />
          ) : (
            <img src={FavoriteIconEmpty} alt="Favorite" onClick={handleFavoriteClick} />
          )}
        </div>
        <Link style={{ textDecoration: "none", color: "#000", cursor: "pointer" }} to={`/catalog/smartphones/productdetails/${props.id}`} onClick={scrollToTop}>
          <img src={props.image} alt="Image not found" />
        </Link>
        <div className="product-text-button">
          <div className="product-info">
            <Link style={{ textDecoration: "none", color: "#000", cursor: "pointer" }} to={`/catalog/smartphones/productdetails/${props.id}`} onClick={scrollToTop}>
              <p>{props.brand} {props.name} {props.storage} {props.color}</p>
              <h2 style={{ cursor: "pointer" }}>${props.price}</h2>
            </Link>
          </div>
          <Link style={{ textDecoration: "none", color: "#000" }} to={`/catalog/smartphones/productdetails/${props.id}`} onClick={scrollToTop}>
            <BuyNowButton />
          </Link>
        </div>
      </div >

    </>
  );
};

export default Product;