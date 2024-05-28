import React from "react";
import SelectAddressCard from "./SelectAddressCard";
import AddLineIcon from "./icons/AddLine.svg";
import AdressLine1Icon from "./icons/addadressline-1.svg";
import AdressLine2Icon from "./icons/addadressline-2.svg";
import StepNextButton from "../StepNextButton";

const PaymentStep1 = () => {
  return (
    <>
      <div className="step-address-content">
        <div className="step-address-container" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div className="address-block" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <h3 style={{ fontWeight: "600", fontSize: "20px", lineHeight: "24px", color: "#17183B" }}>Select Address</h3>
            <div className="select-address-block" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {Array.from({ length: 2 }).map((_, index) => (
                <SelectAddressCard key={index} id={index} />
              ))}
              <div className="add-address-line" style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                <div className="addressline-icon">
                  <img src={AdressLine1Icon} alt="" />
                  <img src={AddLineIcon} alt="" style={{ cursor: "pointer" }} />
                  <img src={AdressLine2Icon} alt="" />
                </div>
                <span style={{ cursor: "pointer" }}>Add New Address</span>
              </div>
            </div>
          </div>
          <div className="address-buttons" style={{ width: "100%", height: "64px", gap: "24px", display: "flex", alignItems: "center", justifyContent: "right" }}>
              <StepNextButton background="#fff" name="Back" />
              <StepNextButton background="#000" name="Next" />
          </div>
        </div>
      </div>
    </>
  )
};

export default PaymentStep1;
