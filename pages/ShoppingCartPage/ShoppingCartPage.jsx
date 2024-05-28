import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCartPage = () => {
    const [cart, setCart] = useState([]);
    const [cardNumber, setCardNumber] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [appliedCouponCode, setAppliedCouponCode] = useState(""); // New state for applied coupon code
    const [isCouponApplied, setIsCouponApplied] = useState(false); // State to disable coupon input
    const navigate = useNavigate();

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

    const calculateTotal = () => {
        let total = cart.reduce((total, item) => total + parseFloat(item.price) * parseFloat(item.quantity), 0);
        if (appliedCouponCode === "NEW100") {
            total -= 100;
        } else if (appliedCouponCode === "NEW50") {
            total -= 50;
        } else if (appliedCouponCode === "START20%") {
            total -= (total * 0.2);
        }
        return total.toFixed(2);
    };

    const handleApplyCardNumber = () => {
        if (cardNumber.length === 16) {
            showToast("Card number is valid!", "success");
        } else {
            showToast("Card number is invalid. Please enter a valid 16-digit card number.", "error");
        }
    };

    const handleApplyCouponCode = () => {
        if (couponCode === "NEW100" || couponCode === "NEW50" || couponCode === "START20%") {
            setAppliedCouponCode(couponCode);
            setIsCouponApplied(true);
            showToast("Coupon code applied successfully!", "success");
        } else {
            showToast("Invalid coupon code. Please enter a valid code.", "error");
        }
    };

    const showToast = (message, type) => {
        toast[type](message, {
            autoClose: 1500
        });
    };

    const handleCheckout = () => {
        if (cardNumber.length !== 16) {
            showToast("Please enter a valid 16-digit card number.", "error");
        } else {
            navigate("/payments/step-1");
        }
    };

    return (
        <>
            <div className="shopping-cart-container">
                <ToastContainer />
                <div className="shopping-cart-content">
                    <div className="shopping-cart-left">
                        <h2 style={{ fontWeight: "600", fontSize: "24px", lineHeight: "24px", color: "#000" }}>Shopping Cart</h2>
                        {cart.length === 0 ? <p style={{ height: "80px", display: "flex", alignItems: "center" }}>Your cart is empty</p>
                            :
                            cart.map(item => <CartItem key={item.id} cartItem={item} onRemove={handleRemoveFromCart} />)}
                    </div>
                    <div className="shopping-cart-summary" style={{ position: "sticky", top: "100px" }}>
                        <h3 style={{ marginBottom: "40px", fontWeight: "700", fontSize: "20px", lineHeight: "16px", color: "#111111" }}>Order Summary</h3>
                        <div className="summary-content">
                            <div className="summary-block">
                                <div className="summary-fields">
                                    <div className="summary-field summary-field-label-1">
                                        <span>Discount code / Promo code</span>
                                        <input
                                            type="text"
                                            placeholder="Code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            disabled={isCouponApplied} // Disable coupon code input if a valid code is applied
                                        />
                                        <button onClick={handleApplyCouponCode} disabled={isCouponApplied}>Apply</button>
                                    </div>
                                    <div className="summary-field summary-field-label-2">
                                        <span>Your bonus card number</span>
                                        <input
                                            type="text"
                                            placeholder="Enter Card Number"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                        />
                                        <button onClick={handleApplyCardNumber}>Approve</button>
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
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCartPage;
