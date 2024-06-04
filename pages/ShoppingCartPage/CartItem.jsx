import React, { useState } from "react";
import Remove from "./icon/remove.svg";
import Edit from "./icon/edit.svg";
import NoEdit from "./icon/no-edit.svg";
import { Link, useNavigate } from "react-router-dom";

const CartItem = ({ cartItem, onRemove, Increment, Decrement }) => {
    const { productId, title, brand, storage, price, quantity, color, screenSize, productImg } = cartItem;
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const navigate = useNavigate();


    const handleRemoveClick = () => {
        onRemove(productId);
    };

    // const handleInputChange = async (e) => {
    //     const newQuantity = parseInt(e.target.value);

    //     if (!isNaN(newQuantity) && newQuantity >= 1) {
    //         try {
    //             const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`);
    //             const userData = response.data;

    //             const userCart = userData.cart;

    //             const productIndex = userCart.findIndex(item => item.productId === productId);

    //             if (productIndex !== -1) {
    //                 userCart[productIndex].quantity = newQuantity;

    //                 await axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, {
    //                     ...userData,
    //                     cart: userCart
    //                 });

    //                 setNewQuantity(newQuantity);

    //                 console.log("Quantity updated successfully!");
    //             } else {
    //                 console.log("Product not found in cart!");
    //             }
    //         } catch (error) {
    //             console.error("Error updating quantity:", error);
    //         }
    //     } else {
    //         setNewQuantity(1);
    //         updateQuantity(1);
    //     }
    // };

    const productRedirection = async () => {
        navigate(`/catalog/smartphones/productdetails/${productId}`)
    }


    return (
        <>
            <div className="cart-item">
                <div onClick={productRedirection} className="cart-item-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor:"pointer" }}>
                    <img style={{ width: "90px", height: "90px" }} src={productImg} alt={title} />
                </div>
                <div className="cart-item-content">
                    <div className="cart-item-info" onClick={productRedirection} style={{cursor:"pointer"}}>
                        <h5 style={{ fontWeight: "500", fontSize: "16px", lineHeight: "24px", color: "#000" }}>{brand} {title} {storage} {color} {screenSize}</h5>
                        <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: "24px", color: "#000" }}>#{productId}515122</span>
                    </div>
                    <div className="cart-item-right-side">
                        <div className="cart-counter">
                            <button style={{ width: "24px", height: "24px", background: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }} onClick={() => Decrement(productId)}>
                                <img src={NoEdit} alt="icon undefined" style={{ width: "24px", height: "24px" }} />
                            </button>
                            <div className="quantity-control">
                                {quantity}
                            </div>
                            <button style={{ width: "24px", height: "24px", background: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }} onClick={() => Increment(productId)}>
                                <img src={Edit} alt="icon undefined" style={{ width: "24px", height: "24px" }} />
                            </button>
                        </div>
                        <span>{price}</span>
                        <button onClick={handleRemoveClick} style={{ width: "24px", height: "24px", background: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
                            <img src={Remove} alt="icon undefined" style={{ width: "24px", height: "24px" }} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="devider"></div>
        </>
    );
};

export default CartItem;
