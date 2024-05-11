import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteIconEmpty from "../jsxSvg/emptyHeart.svg"; // Boş kalp ikonu
import FavoriteIconFilled from "../jsxSvg/filledHeart.svg"; // Dolu kalp ikonu
import BuyNowButton from "./buyNowButton";
import { Link } from "react-router-dom";

const Product = (props) => {
  const productId = props.id; 

  // Favorilere eklendi durumu için yerel depolama
  const [isFavorite, setIsFavorite] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites)[productId] || false : false;
  });

  // Favori değiştiğinde yerel depolama güncelle
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
    setIsFavorite(!isFavorite); // Favorilere eklendi durumunu tersine çevir

    if (!isFavorite) {
      toast.success("Added to favorites", {
        position: "top-right",
        autoClose: 1750, // 1 saniye sonra otomatik olarak kapanacak
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Removed from favorites!", {
        position: "top-right",
        autoClose: 1500, // 1 saniye sonra otomatik olarak kapanacak
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
          {/* Favorilere ekleme işlevselliği */}
          {isFavorite ? (
            <img src={FavoriteIconFilled} alt="Favorite" onClick={handleFavoriteClick} />
          ) : (
            <img src={FavoriteIconEmpty} alt="Favorite" onClick={handleFavoriteClick} />
          )}
        </div>
        <img src={props.image} alt="Image not found" />
        <div className="product-text-button">
          <div className="product-info">
            <p>{props.name} {props.storage} {props.color} {props.mainCamera} {props.cpu}</p>
            <h2>{props.price}</h2>
          </div>
          <Link style={{ textDecoration: "none" }} to={`/catalog/smartphones/productdetails/${props.id}`} onClick={scrollToTop}>
            <BuyNowButton />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Product;