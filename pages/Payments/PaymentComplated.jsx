import React from "react";
import { Link } from "react-router-dom"

const PaymentComplated = () => {
    return (
        <>
            <div className="payment-complated">
                <div style={{ border: "2px solid #d4d4d4", padding: "35px", borderRadius:"3px" }}>
                    <h2>Your payment has been successfully completed</h2>
                    <p>Thank you for your payment. Your order will be shipped shortly.</p>
                    <span>Your order number: 219248239454</span>
                </div>
                <Link to="/" style={{ textDecoration: "none", color: "#000", fontWeight: "600", marginTop: "20px" }}>
                    <button style={{ border: "1px solid black", background: "none", padding: "10px 20px", borderRadius: "3px", cursor: "pointer" }}>Back to Homepage</button>
                </Link>
            </div>
        </>
    )
};

export default PaymentComplated;
