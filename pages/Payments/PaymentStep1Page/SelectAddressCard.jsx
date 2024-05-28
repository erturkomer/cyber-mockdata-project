import React from "react";
import EditIcon from "./icons/edit.svg";
import DeleteIcon from "./icons/delete.svg";

const SelectAddressCard = ({ id }) => {
    return (
        <div className="address-card">
            <div className="address-card-content">
                <div className="address-card-content-top">
                    <div className="address-radio">
                        <input type="radio" id={`address-${id}`} name="address" />
                        <label htmlFor={`address-${id}`} className="custom-radio"></label >
                        <span>2118 Thornridge</span>
                    </div>
                    <div className="address-tag">Home</div>
                </div>
                <div className="address-card-info">
                    <span>2118 Thornridge Cir. Syracuse, Connecticut 35624</span>
                    <span>(209) 555-0104</span>
                </div>
            </div>
            <div className="address-card-actions">
                <img src={EditIcon} alt="Edit" />
                <img src={DeleteIcon} alt="Delete" />
            </div>
        </div>
    );
};

export default SelectAddressCard;
