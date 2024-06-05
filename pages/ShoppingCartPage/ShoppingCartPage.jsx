import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { useNavigate, Link } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCartPage = ({ handleRemoveFromCart, cart, setCart, Increment, Decrement }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [appliedCouponCode, setAppliedCouponCode] = useState("");
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        if (isLoggedIn && userDetails && userDetails.id) {
            axios
                .get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
                .then((response) => {
                    const cartRes = response.data.cart || [];
                    setCart(cartRes);
                })
                .catch((error) => {
                    console.error("Error fetching cart:", error);
                    showToast("Error fetching cart data.", "error");
                });
        }
    }, [isLoggedIn, userDetails?.id]);

    const calculateTotal = () => {
        let total = cart.reduce((total, item) => total + parseFloat(item.price) * parseFloat(item.quantity), 0);
        if (appliedCouponCode === "NEW100") {
            total -= 100;
        } else if (appliedCouponCode === "NEW50") {
            total -= 50;
        } else if (appliedCouponCode === "START20%") {
            total -= total * 0.2;
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
        if (["NEW100", "NEW50", "START20%"].includes(couponCode)) {
            setAppliedCouponCode(couponCode);
            setIsCouponApplied(true);
            showToast("Coupon code applied successfully!", "success");
        } else {
            showToast("Invalid coupon code. Please enter a valid code.", "error");
        }
    };

    const showToast = (message, type) => {
        toast[type](message, {
            autoClose: 1500,
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
            {!isLoggedIn && (
                <div className="not-logged-in" style={{ height: "50vh" , display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <span>
                        You are not logged in. Please <Link to="/login" style={{textDecoration:"none"}}> <button style={{border:"1px solid black", background:"none", margin:"5px", padding:"2px 12px", borderRadius:"3px"}}>log in</button></Link> and see your shopping cart.
                    </span>
                </div>
            )}
            {isLoggedIn && (
                <div className="shopping-cart-container">
                    <div className="shopping-cart-content">
                        <div className="shopping-cart-left">
                            <h2 className="cart-title" style={{ fontWeight: "600", fontSize: "24px", lineHeight: "24px", color: "#000" }}>Shopping Cart</h2>
                            {cart.length === 0 ? (
                                <p style={{ height: "80px", display: "flex", alignItems: "center" }} className="empty-cart-message">Your cart is empty</p>
                            ) : (
                                cart.map((item) => (
                                    <CartItem key={item.productId} cartItem={item} onRemove={handleRemoveFromCart} Increment={Increment} Decrement={Decrement} />
                                ))
                            )}
                        </div>
                        <div className="shopping-cart-summary" style={{ position: "sticky", top: "100px" }}>
                            <h3 className="summary-title" style={{ marginBottom: "40px", fontWeight: "700", fontSize: "20px", lineHeight: "16px", color: "#111111" }}>Order Summary</h3>
                            <div className="summary-content">
                                <CouponAndCardInput
                                    couponCode={couponCode}
                                    setCouponCode={setCouponCode}
                                    handleApplyCouponCode={handleApplyCouponCode}
                                    isCouponApplied={isCouponApplied}
                                    cardNumber={cardNumber}
                                    setCardNumber={setCardNumber}
                                    handleApplyCardNumber={handleApplyCardNumber}
                                />
                                <div className="summary-prices">
                                    <div className="total-price">
                                        <span>Total</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const CouponAndCardInput = ({ couponCode, setCouponCode, handleApplyCouponCode, isCouponApplied, cardNumber, setCardNumber, handleApplyCardNumber }) => {
    return (
        <div className="summary-fields">
            <div className="summary-field summary-field-label-1">
                <span>Discount code / Promo code</span>
                <input
                    type="text"
                    placeholder="Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isCouponApplied}
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
    );
};

export default ShoppingCartPage;
