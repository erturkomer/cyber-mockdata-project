import React, { useState, useEffect } from "react";
import axios from 'axios';
import FavoriteIcon from "../../../components/allPageComponents/jsxSvg/filledHeart.svg";
import { ToastContainer, toast } from "react-toastify";

const FavoriteList = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails?.id;

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`);
        const user = response.data;
        setFavoriteProducts(user.favoriteProducts || []);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    if (userId) {
      fetchFavoriteProducts();
    }
  }, []);

  const handleRemoveFromFavorites = async (productId) => {
    try {
      const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`);
      const user = userResponse.data;

      const updatedFavoriteProducts = user.favoriteProducts.filter(product => product.id !== productId);
      user.favoriteProducts = updatedFavoriteProducts;
      await axios.put(`${import.meta.env.VITE_API_URL}users/${userId}`, user);

      setFavoriteProducts(updatedFavoriteProducts);

      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        delete favorites[productId];
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      toast.error("Removed from favorites!", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("An error occurred while removing from favorites.", {
        position: "top-right",
        autoClose: 4000,
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
      <div style={{ padding: "112px 160px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <h3>Your Favorite Products</h3>
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map(product => (
            <div key={product.id} >
              <div style={{ width: "100%", height: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "50px 16px", background: "#f6f6f6", borderRadius: "8px" }}>
                <img style={{ width: "80px" }} src={product.image} alt="" />
                <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "95%" }}>
                  <h5 style={{width:"94%",margin:"0", fontWeight:"500", fontSize:"22px"}}>{product.name} {product.storage}</h5>
                  <span style={{margin:"0", fontSize:"16px", fontWeight:"600"}}>${product.price}</span>
                </div>
                <img style={{cursor:"pointer"}} src={FavoriteIcon} alt="" onClick={() => handleRemoveFromFavorites(product.id)} />
              </div>
            </div>
          ))
        ) : (
          <p>You don't have any favorite products yet.</p>
        )}
      </div>
    </>
  );  
};

export default FavoriteList;
