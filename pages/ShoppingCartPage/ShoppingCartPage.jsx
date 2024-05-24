import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";

const ShoppingCartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}cart`)
            .then(response => setCart(response.data))
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    const handleRemoveFromCart = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}cart/${id}`)
            .then(() => setCart(cart.filter(item => item.id !== id)))
            .catch(error => console.error('Error deleting item from cart:', error));
    };


    const calculateTotal = () => cart.reduce((total, item) => total + parseFloat(item.price) * parseFloat(item.quantity), 0).toFixed(2);

    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart-content">
                <div className="shopping-cart-left">
                    <h2 style={{ fontWeight: "600", fontSize: "24px", lineHeight: "24px", color: "#000" }}>Shopping Cart</h2>
                    {cart.length === 0 ? <p style={{ height: "80px", display: "flex", alignItems: "center" }}>Your cart is empty</p>
                        :
                        cart.map(item => <CartItem key={item.id} cartItem={item} onRemove={handleRemoveFromCart} />)}
                </div>
                <div className="shopping-cart-summary"  style={{ position: "sticky",top:"100px"}}>
                    <h3 style={{ marginBottom: "40px", fontWeight: "700", fontSize: "20px", lineHeight: "16px", color: "#111111" }}>Order Summary</h3>
                    <div className="summary-content">
                        <div className="summary-block">
                            <div className="summary-fields">
                                <div className="summary-field summary-field-label-1">
                                    <span>Discount code / Promo code</span>
                                    <input type="text" placeholder="Code" />
                                </div>
                                <div className="summary-field summary-field-label-2">
                                    <span>Your bonus card number</span>
                                    <input type="text" placeholder="Enter Card Number" />
                                    <button>Apply</button>
                                </div>
                            </div>
                            <div className="summary-prices">
                                <div className="total-price">
                                    <span>Total</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;