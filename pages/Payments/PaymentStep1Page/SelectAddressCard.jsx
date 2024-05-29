import React from "react";
import EditIcon from "./icons/edit.svg";
import DeleteIcon from "./icons/delete.svg";

const SelectAddressCard = ({ id, addressData, deleteAddress, editAddress, handleAddressSelect, selectedAddressId }) => {
    return (
        <div className="address-card">
            <div className="address-card-content">
                <div className="address-card-content-top">
                    <div className="address-radio">
                        <input 
                            type="radio" 
                            id={`address-${id}`} 
                            name="address" 
                            checked={selectedAddressId === id}
                            onChange={() => handleAddressSelect(id)}
                        />
                        <label htmlFor={`address-${id}`} className="custom-radio"></label>
                        <span>{addressData.address}</span>
                    </div>
                    <div className="address-tag">{addressData.tag}</div>
                </div>
                <div className="address-card-info">
                    <span>{addressData.addressLine1}</span>
                    <span>{addressData.addressLine2}</span>
                    <span>{addressData.phoneNumber}</span>
                </div>
            </div>
            <div className="address-card-actions">
                <img src={EditIcon} alt="Edit" onClick={() => editAddress(id)} style={{ cursor: "pointer" }} />
                <img src={DeleteIcon} alt="Delete" onClick={() => deleteAddress(id)} style={{ cursor: "pointer" }} />
            </div>
        </div>
    );
};

export default SelectAddressCard;
