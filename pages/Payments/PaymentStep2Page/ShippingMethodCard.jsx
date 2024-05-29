import React from "react";

const ShippingMethodCard = ({ id, selectedShippingMethodId, handleMethodSelect, handleDateChange, selectedDate, name, shippingPrice, dateSelected, dateName }) => {
    return (
        <div className="shipping-method-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "24px", borderRadius: "11px", border: "1px solid #D1D1D8" }}>
            <div className="shipping-method-card-text" style={{ width: "90%", display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="shipping-radio address-radio" style={{ display: "flex", gap: "16px" }}>
                    <input
                        type="radio"
                        id={`shipping-method-${id}`}
                        name="shippingMethod"
                        checked={selectedShippingMethodId === id}
                        onChange={() => handleMethodSelect(id)}
                    />
                    <label htmlFor={`shipping-method-${id}`} className="custom-radio">
                    </label>
                    <span>{shippingPrice}</span>
                </div>
                <span>{name}</span>
            </div>
            {dateSelected ?
                <input style={{ border: "none", outline: "none" }} type="date" value={selectedDate} onChange={(e) => handleDateChange(id, e.target.value)} />
                :
                <span>{dateName}</span>
                }
        </div>
    );
};

export default ShippingMethodCard;
