import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SelectAddressCard from "./SelectAddressCard";
import AddLineIcon from "./icons/AddLine.svg";
import AdressLine1Icon from "./icons/addadressline-1.svg";
import AdressLine2Icon from "./icons/addadressline-2.svg";
import StepNextButton from "../StepNextButton";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PaymentStep1 = () => {
  const [pop, setPop] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    tag: "HOME",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: ""
  });
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}address`)
      .then(response => {
        setAddressData(response.data);
      })
      .catch(error => {
        console.error("Error fetching addresses:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const phoneNumberPattern = /^\d*$/;
      if (phoneNumberPattern.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = { ...formData };

    if (isEditMode && currentEditId !== null) {
      axios.put(`${import.meta.env.VITE_API_URL}address/${currentEditId}`, newAddress)
        .then(response => {
          const updatedAddresses = addressData.map(address =>
            address.id === currentEditId ? response.data : address
          );
          setAddressData(updatedAddresses);
          resetForm();
        })
        .catch(error => {
          console.error("Error updating address:", error);
        });
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}address`, newAddress)
        .then(response => {
          setAddressData([...addressData, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error("Error adding new address:", error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      address: "",
      tag: "HOME",
      addressLine1: "",
      addressLine2: "",
      phoneNumber: ""
    });
    setIsEditMode(false);
    setCurrentEditId(null);
    setPop(false);
  };

  const deleteAddress = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}address/${id}`)
      .then(() => {
        setAddressData(addressData.filter(address => address.id !== id));
      })
      .catch(error => {
        console.error("Error deleting address:", error);
      });
  };

  const editAddress = (id) => {
    const addressToEdit = addressData.find(address => address.id === id);
    setFormData(addressToEdit);
    setIsEditMode(true);
    setCurrentEditId(id);
    setPop(true);
  };

  const closeModal = () => {
    resetForm();
  };

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleNextClick = (e) => {
    if (!selectedAddressId) {
      e.preventDefault();
      toast.error("Please select an address before proceeding.", { autoClose: 500 });
    }
  };

  return (
    <>
      <div className="step-address-content">
        <div className="step-address-container" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div className="address-block" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <h3 style={{ fontWeight: "600", fontSize: "20px", lineHeight: "24px", color: "#17183B" }}>Select Address</h3>
            <div className="select-address-block" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {addressData.map((data, index) => (
                <SelectAddressCard key={index} id={data.id} addressData={data} deleteAddress={deleteAddress} editAddress={editAddress} handleAddressSelect={handleAddressSelect} selectedAddressId={selectedAddressId} />
              ))}
              <div className="add-address-line" style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                <div className="addressline-icon">
                  <img src={AdressLine1Icon} alt="" />
                  <img src={AddLineIcon} alt="" style={{ cursor: "pointer" }} onClick={() => setPop(true)} />
                  <img src={AdressLine2Icon} alt="" />
                </div>
                <span style={{ cursor: "pointer" }} onClick={() => setPop(true)}>Add New Address</span>
              </div>
            </div>
          </div>
          <div className="address-buttons" style={{ width: "100%", height: "64px", gap: "24px", display: "flex", alignItems: "center", justifyContent: "right" }}>
            <Link to="/shoppingcart"><StepNextButton background="#fff" name="Back" /></Link>
            <Link to="/payments/step-2" onClick={handleNextClick}>
              <StepNextButton background="#000" name="Next" />
            </Link>
          </div>
        </div>
      </div>
      {pop ? (
        <div className="pop" style={{ position: "fixed", width: "100%", height: "100%", top: "0", left: "0", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={closeModal}>
          <div className="modal-content" style={{ width: "50%", backgroundColor: "#fff", borderRadius: "8px", padding: "40px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "16px" }}>{isEditMode ? "Edit Address" : "Add New Address"}</h2>
            <form className="modal-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", lineHeight: "50px" }}>
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

              <label htmlFor="tag">Tag:</label>
              <select id="tag" name="tag" value={formData.tag} onChange={handleChange} required style={{ width: "100%", height: "50px", borderRadius: "6px", border: "2px solid #000", padding: "0 8px" }}>
                <option value="HOME">HOME</option>
                <option value="OFFICE">OFFICE</option>
              </select>

              <label htmlFor="addressLine1">Address Line 1:</label>
              <input type="text" id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />

              <label htmlFor="addressLine2">Address Line 2:</label>
              <input type="text" id="addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

              <button type="submit" style={{
                border: "0", background: "#000", outline: "none", color: "#fff", borderRadius: "6px", margin: "24px 0", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"
              }}>{isEditMode ? "Update Address" : "Add Address"}</button>
            </form>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </>
  );
};

export default PaymentStep1;
