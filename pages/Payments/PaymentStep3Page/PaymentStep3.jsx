import React from "react";
import SelectedProducts from "./SelectedProducts";
import { useLocation } from "react-router-dom";

const PaymentStep3 = () => {
  const location = useLocation();
  const { cart, selectedAddress, selectedShippingMethodId, totalPrice } = location.state || [];

  return (
    <>
      <div className="payments-step-3-container">
        <div className="payments-step-3-left-side">
          <h3 className="step-3-summary-title">Summary</h3>
          <div className="step-3-selected-products">
            {console.log(cart, selectedAddress, selectedShippingMethodId)}
            {cart.map((product) => (
            <SelectedProducts key={product.productId} productTitle={product.title} productBrand={product.brand} productImg={product.productImg} productPrice={product.price} productStorage={product.storage} />
            ))}
          </div>
          <div className="step-3-details">
            <div className="step-3-shipment-info">
              <div className="step-3-shipment-address-info">
                <h6>Address</h6>
                <div className="step-3-shipment-address-field">
                  <p>{selectedAddress.addressLine1}</p>
                </div>
              </div>
              <div className="step-3-shipment-method-info">
                <h6>Shipment method</h6>
                <div className="shep-3-shipment-method-field">
                  <p>Free</p>
                </div>
              </div>
            </div>
            <div className="step-3-price-info">
              <div className="step-3-subtotal">
                <h6>Subtotal</h6>
                <span>$2347</span>
              </div>
              <div className="step-3-taxes-container">
                <div className="step-3-taxes">
                  <h6>Estimeted Tax</h6>
                  <span>$50</span>
                </div>
                <div className="step-3-taxes">
                  <h6>Estimeted shipping & Handling</h6>
                  <span>$29</span>
                </div>
                <div className="step-3-total-price">
                  <h6>Total</h6>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payments-step-3-right-side">
        </div>
      </div>
    </>
  )
};

export default PaymentStep3;
