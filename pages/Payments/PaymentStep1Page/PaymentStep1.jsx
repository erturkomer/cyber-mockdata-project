import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SelectAddressCard from "./SelectAddressCard";
import AddLineIcon from "./icons/AddLine.svg";
import AdressLine1Icon from "./icons/addadressline-1.svg";
import AdressLine2Icon from "./icons/addadressline-2.svg";
import StepNextButton from "../StepNextButton";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";


const PaymentStep1 = () => {
  const [pop, setPop] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const location = useLocation();
  const { cart, totalPrice } = location.state || [];
  const [formData, setFormData] = useState({
    address: "",
    tag: "HOME",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: ""
  });
  const [addressData, setAddressData] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart || !totalPrice) {
      navigate("/shoppingcart", { replace: true });
    }
  }, [cart, totalPrice, navigate]);


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
      .then((response) => {
        const registeredAddresses = response.data.registeredAddresses || []
        setAddressData(registeredAddresses)
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [userDetails.id, userDetails.registeredAddresses])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const phoneNumberPattern = /^\d*$/;
      if (phoneNumberPattern.test(value)) {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      }
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }
  };

  const deleteAddress = (id) => {
    axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
      .then((res) => {
        const updatedAddresses = res.data.registeredAddresses.filter(address => address.id !== id);
        axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, { ...res.data, registeredAddresses: updatedAddresses })
          .then(() => {
            setAddressData(updatedAddresses);
          })
          .catch(error => {
            console.error('Error updating user data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  const editAddress = (id) => {
    axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
      .then((res) => {
        const addressToEdit = res.data.registeredAddresses.find(address => address.id === id);
        setFormData({
          address: addressToEdit.address,
          tag: addressToEdit.tag,
          addressLine1: addressToEdit.addressLine1,
          addressLine2: addressToEdit.addressLine2,
          phoneNumber: addressToEdit.phoneNumber,
        });
        setIsEditMode(true);
        setCurrentEditId(id);
        setPop(true);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching address. Please try again later.", { autoClose: 2000 });
      });
  };
  const editAddresse = (id) => {
    axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
      .then((res) => {
        axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, {
          ...res.data,
          registeredAddresses: res.data.registeredAddresses.map(address =>
            address.id === id ? { ...address, ...formData } : address
          )
        })
          .then(() => {
            console.log("Address updated successfully!");
            -      resetForm();

          })
          .catch(error => {
            console.error('Error updating user data:', error);
            toast.error("Error updating address. Please try again later.", { autoClose: 2000 });
          });

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching address. Please try again later.", { autoClose: 2000 });
      });


  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const options = { timeZone: "Europe/Istanbul" };
    const addressCreationDate = {
      year: currentDate.toLocaleString("tr-TR", { year: "numeric", timeZone: options.timeZone }),
      month: currentDate.toLocaleString("tr-TR", { month: "2-digit", timeZone: options.timeZone }),
      day: currentDate.toLocaleString("tr-TR", { day: "2-digit", timeZone: options.timeZone }),
      hour: currentDate.toLocaleString("tr-TR", { hour: "2-digit", hour12: false, timeZone: options.timeZone }),
      minute: currentDate.toLocaleString("tr-TR", { minute: "2-digit", timeZone: options.timeZone }),
      second: currentDate.toLocaleString("tr-TR", { second: "2-digit", timeZone: options.timeZone }),
    };

    const newAddress = { id: uuidv4(), ...formData, addressCreationDate };

    if (isEditMode && currentEditId !== null) {
      editAddresse(currentEditId);
    } else {
      axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
        .then((res) => {
          const updatedAddresses = [...res.data.registeredAddresses, newAddress];
          axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, { ...res.data, registeredAddresses: updatedAddresses })
            .then(() => {
              setAddressData(updatedAddresses);
              resetForm();
            })
            .catch(error => {
              console.error('Error updating user data:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
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

  const closeModal = () => {
    resetForm();
  };

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleNextClick = () => {
    if (!selectedAddressId) {
      console.error("Please select an address before proceeding.");
    } else {
      const selectedAddress = addressData.find(address => address.id === selectedAddressId);
      navigate("/payments/step-2", { state: { cart: cart, selectedAddress: selectedAddress, totalPrice: totalPrice } });
    }
  };

  const handleStepBack = () => {
    navigate("/shoppingcart", {
      state: {
        cart: cart,
        totalPrice: totalPrice,
      },
    });
    console.log("state aktarıldı");
  }


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
            <StepNextButton background="#fff" name="Back" onClick={handleStepBack} />
            <StepNextButton background="#000" name="Next" onClick={handleNextClick} />
          </div>
        </div>
      </div>
      {pop ? (
        <div className="pop" style={{
          position: "fixed", width: "100%", height: "100%", top: "0", left: "0", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }} onClick={closeModal}>
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
  )
}
export default PaymentStep1;  