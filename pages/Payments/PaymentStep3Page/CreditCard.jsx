import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CreditCardForm = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" && value.length <= 16) {
      setState((prev) => ({ ...prev, [name]: value }));
    } else if (name !== "number") {
      setState((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "cvc" && value.length <= 4) {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "40px", width: "100%" }}>
      <div>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
          placeholders={{ name: "FULL NAME" }}
          issuer={"visa"}
          preview={false}
          locale={{ valid: "MM/YY" }}
          style={{ width: "300px" }}
        />
      </div>
      <div style={{ width: "100%" }}>
        <form style={{ width: "100%" }}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Cardholder Name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={32}
              style={{ width: "100%", height:"48px" }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={16}
              style={{ width: "100%", height:"48px" }}
              required
            />
          </div>
          <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="col-6 mb-3">
              <input
                type="text"
                name="expiry"
                className="form-control"
                placeholder="Exp.Date"
                pattern="\d\d/\d\d"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
                style={{ width: "245px", height:"48px" }}
                required
              />
            </div>
            <div className="col-6 mb-3">
              <input
                type="text"
                name="cvc"
                className="form-control"
                placeholder="CVV"
                pattern="\d{3,4}"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
                style={{ width: "245px", height:"48px" }}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
