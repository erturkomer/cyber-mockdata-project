import React, { useState } from "react";
import CheckBoxIcon from "./icon/checkboxIcon.svg";

const BlackCheckbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [id] = useState(Math.random().toString(36).substring(7)); // Benzersiz bir id oluştur

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    props.onChange();
  };

  return (
    <div className="filter-brand">
      <div className="checkbox-filter" style={{ display: "flex", alignItems: "center", position: "relative", width: "24px", height: "24px" }}>
        <input type="checkbox" id={id} checked={isChecked} onChange={handleCheckboxChange} />
        <label htmlFor={id} style={{ display: "flex" }}>
          <img src={CheckBoxIcon} alt="Checkbox Icon" style={{ cursor: "pointer", position: "absolute", top: "45%", left: "35%", transform: "translate(-50%, -50%)" }} />
        </label>
      </div>
      <div className="filter-brand-content-s" style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "black", fontWeight: "500", fontSize: "15px", lineHeight: "24px", paddingRight: "5px" }}>{props.name}</span>
        <span style={{ color: "#9f9f9f", fontWeight: "400", fontSize: "12px", lineHeight: "24px" }}>{props.count}</span>
      </div>
    </div>
  );
};

export default BlackCheckbox;