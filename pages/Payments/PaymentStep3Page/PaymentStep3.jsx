import React, { useState, useEffect } from "react";
import SelectedProducts from "./SelectedProducts";
import { useLocation, useNavigate } from "react-router-dom";
import StepNextButton from "../StepNextButton";
import CreditCard from "./CreditCard";
import CheckBoxIcon from "../../ProductPage/icon/checkboxIcon.svg";

const PaymentStep3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, selectedAddress, totalPrice, selectedMethod } =
    location.state || [];
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  useEffect(() => {
    if (!cart || !totalPrice || !selectedAddress || !selectedMethod) {
      navigate("/shoppingcart", { replace: true });
    }
  }, [cart, , selectedAddress, selectedMethod, totalPrice, navigate]);

  const handleCreditCardClick = () => {
    navigate("/payments/step-3", {
      state: {
        cart: cart,
        selectedAddress: selectedAddress,
        selectedMethod: selectedMethod,
        totalPrice: totalPrice,
      },
    });
    console.log("state aktarıldı");
  };

  const handlePayPalClick = () => {
    navigate("/payments/step-3/paypal", {
      state: {
        cart: cart,
        selectedAddress: selectedAddress,
        selectedMethod: selectedMethod,
        totalPrice: totalPrice,
      },
    });
    console.log("state aktarıldı");
  };

  const handlePayPalCreditClick = () => {
    navigate("/payments/step-3/paypal-credit", {
      state: {
        cart: cart,
        selectedAddress: selectedAddress,
        selectedMethod: selectedMethod,
        totalPrice: totalPrice,
      },
    });
    console.log("state aktarıldı");
  };

  const handleStepBack = () => {
    navigate("/payments/step-2", {
      state: {
        cart: cart,
        selectedAddress: selectedAddress,
        selectedMethod: selectedMethod,
        totalPrice: totalPrice,
      },
    });
    console.log("state aktarıldı");
  }

  return (
    <>
      <div className="payments-step-3-container">
        <div className="payments-step-3-left-side">
          <h3 className="step-3-summary-title">Summary</h3>
          <div className="step-3-selected-products">
            {cart?.map((product) => (
              <SelectedProducts
                key={product.productId}
                productTitle={product.title}
                productBrand={product.brand}
                productImg={product.productImg}
                productPrice={product.price}
                productStorage={product.storage}
              />
            ))}
          </div>
          <div className="step-3-details">
            <div className="step-3-shipment-info">
              <div className="step-3-shipment-address-info">
                <h6>Address</h6>
                <div className="step-3-shipment-address-field">
                  <p>{selectedAddress?.addressLine1}</p>
                </div>
              </div>
              <div className="step-3-shipment-method-info">
                <h6>Shipment method</h6>
                <div className="shep-3-shipment-method-field">
                  <p>{selectedMethod}</p>
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
                  <h6>Estimated Tax</h6>
                  <span>$50</span>
                </div>
                <div className="step-3-taxes">
                  <h6>Estimated shipping & Handling</h6>
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
          <div className="step-3-right-details">
            <div className="step-3-right-top">
              <h3>Payment</h3>
              <div className="step-3-right-tabs">
                <span
                  style={
                    location.pathname === "/payments/step-3"
                      ? {
                        borderBottom: "1px solid #000",
                        color: "#000",
                      }
                      : {}
                  }
                  onClick={() => handleCreditCardClick()}
                >
                  Credit Card
                </span>
                <span
                  style={
                    location.pathname === "/payments/step-3/paypal"
                      ? { borderBottom: "1px solid #000", color: "#000" }
                      : {}
                  }
                  onClick={handlePayPalClick}
                >
                  PayPal
                </span>
                <span
                  style={
                    location.pathname === "/payments/step-3/paypal-credit"
                      ? { borderBottom: "1px solid #000", color: "#000" }
                      : {}
                  }
                  onClick={handlePayPalCreditClick}
                >
                  PayPal Credit
                </span>
              </div>
              <div className="step-3-credit-card">
                <CreditCard />
              </div>
              <div className="step-3-credit-card-checkbox" style={{ display: "flex" }}>
                <div className="credit-card-checkbox">
                  <div
                    className="filter-brand"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkboxChecked}
                      onChange={() => setCheckboxChecked(!checkboxChecked)}
                    />
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={CheckBoxIcon}
                        alt="Checkbox Icon"
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "45%",
                          left: "32%",
                          width: "6px",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </label>
                  </div>
                </div>
                <span style={{ fontWeight: "500", fontSize: "15px" }}>Save your card</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StepNextButton background="#fff" name="Back" width="244.5px" onClick={handleStepBack} />
                <StepNextButton background="#000" name="Pay" width="244.5px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStep3;
