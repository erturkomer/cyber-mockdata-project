import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./UserDetail.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import EditIcon from "../Payments/PaymentStep1Page/icons/edit.svg";
import DeleteIcon from "../Payments/PaymentStep1Page/icons/delete.svg";

const UserDetail = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [avatarUrl, setAvatarUrl] = useState('');
    const [newName, setNewName] = useState(userDetails.fullName);
    const [newEmail, setNewEmail] = useState(userDetails.email);
    const [newUsername, setNewUsername] = useState(userDetails.userName);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(location.pathname);
    const [addressData, setAddressData] = useState([]);

    useEffect(() => {
        setMenu(location.pathname);
        if (userDetails && userDetails.avatarUrl) {
            setAvatarUrl(userDetails.avatarUrl);
        } else {
            const defaultAvatarUrl = generateDefaultAvatarUrl(userDetails.fullName);
            setAvatarUrl(defaultAvatarUrl);
        }
    }, [location, userDetails]);

    const generateDefaultAvatarUrl = (fullName) => {
        if (!fullName) return '';
        const initials = getInitials(fullName);
        const avatarInitials = placeInitialsToCenter(initials);
        return `https://ui-avatars.com/api/?name=${avatarInitials}&background=random&color=fff`;
    };

    const getInitials = (fullName) => {
        const parts = fullName.split(' ');
        if (parts.length === 1) return parts[0].charAt(0);
        return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
    };

    const placeInitialsToCenter = (initials) => {
        const maxLength = 2;
        const spaceCount = Math.floor((maxLength - initials.length) / 2);
        return ' '.repeat(spaceCount) + initials + ' '.repeat(spaceCount);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userDetails");
        window.location.href = "/login";
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const updatedUserDetails = {
                        ...userDetails,
                        avatarUrl: reader.result
                    };
                    await axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, updatedUserDetails);
                    localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
                    setAvatarUrl(reader.result);
                    toast.success("Image uploaded successfully", { autoClose: 2000 });
                } catch (error) {
                    console.error('Error updating avatar:', error);
                    toast.error("Error uploading image", { autoClose: 2000 });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarDelete = () => {
        const defaultAvatarUrl = generateDefaultAvatarUrl(userDetails.fullName);
        setAvatarUrl(defaultAvatarUrl);
        const updatedUserDetails = {
            ...userDetails,
            avatarUrl: defaultAvatarUrl
        };
        localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
        axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, updatedUserDetails)
            .then(() => {
                toast.success("Image deleted successfully", { autoClose: 2000 });
            })
            .catch((error) => {
                console.error('Error deleting avatar:', error);
                toast.error("Error deleting image", { autoClose: 2000 });
            });
    };

    const handleUpdateUserInfo = () => {
        if (!validateEmail(newEmail)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        const updatedUserDetails = {
            ...userDetails,
            fullName: newName,
            email: newEmail,
            userName: newUsername
        };
        axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, updatedUserDetails)
            .then(() => {
                toast.success("User information updated successfully", { autoClose: 2000 });
                localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
                setAvatarUrl(generateDefaultAvatarUrl(newName));
            })
            .catch((error) => {
                console.error('Error updating user information:', error);
                toast.error("Error updating user information", { autoClose: 2000 });
            });
    };

    const handlePasswordChange = () => {
        if (userDetails.password !== oldPassword) {
            setErrorMessage('Please enter your current password correctly.');
            return;
        }

        const updatedUserDetails = {
            ...userDetails,
            password: newPassword
        };

        axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, updatedUserDetails)
            .then(() => {
                toast.success("Password updated successfully", { autoClose: 2000 });
                localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
            })
            .catch((error) => {
                console.error('Error updating password:', error);
                toast.error("Error updating password", { autoClose: 2000 });
            });
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const isInfoChanged = () => {
        return newName !== userDetails.fullName || newEmail !== userDetails.email || newUsername !== userDetails.userName;
    };

    return (
        isLoggedIn ?
            <>
                <div className="main-container">
                    <div className="left-side">
                        <div className="avatar-container">
                            <div className="avatar">
                                <img src={avatarUrl} alt="User Avatar" onClick={() => document.getElementById('avatarInput').click()} />
                                <input type="file" id="avatarInput" style={{ display: "none" }} onChange={handleAvatarChange} />
                            </div>
                            <span className="user-name">{userDetails.fullName}</span>
                        </div>
                        <div onClick={() => navigate("/userinformation")} className="user-info-heading" style={location.pathname === "/userinformation" | location.pathname == "/userinformation/passwordchange" ? { borderBottom: "1px solid #000", } : {}}>My User Information</div>
                        <div onClick={() => navigate("/registeredaddress")} className="user-info-heading" style={location.pathname === "/registeredaddress" ? { borderBottom: "1px solid #000" } : {}}>Registered Addresses</div>
                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        ><IoLogOutOutline />Logout
                        </button>
                    </div>
                    <div className="right-side">
                        {location.pathname === "/userinformation" | location.pathname === "/userinformation/passwordchange" && (
                            <><div style={{ display: "flex", flexDirection: "column", width: "48%" }}>
                                <h2 style={{ fontSize: "28px", lineHeight: "36px", fontWeight: "600", color: "#484848", fontFamily: "Inter, -apple-system, Helvetica Neue, sans-serif" }}>My user information</h2>
                                <ul className="user-information" style={{ listStyleType: "none", marginTop: "32px" }}>
                                    <li className={menu === "/userinformation" ? "active" : ""} onClick={() => setMenu("/userinformation")}>
                                        <Link to="/userinformation" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#484848", fontFamily: "Inter, -apple-system, Helvetica Neue, sans-serif" }}>Membership information</span>
                                        </Link>
                                    </li>
                                    <li className={menu === "/userinformation/passwordchange" ? "active" : ""} onClick={() => setMenu("/userinformation/passwordchange")}>
                                        <Link to="/userinformation/passwordchange" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#484848", fontFamily: "Inter, -apple-system, Helvetica Neue, sans-serif" }}>Password change</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div><div className="menu">
                                    {menu === "/userinformation" && (
                                        <div className="profile-information">
                                            <h4 style={{ fontSize: "20px", lineHeight: "30px", color: "#484848", fontWeight: "600", fontFamily: "Inter, -apple-system, Helvetica Neue, sans-serif" }}>Profile information</h4>
                                            <p className="profile-info-psa" style={{ cursor: "default", padding: "0", background: "#fff" }}>Here you can edit the information we need to optimize your experience at Cyber.</p>
                                            <div className="membership-info">
                                                <div className="membership-input-t1" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                                    <div className="membership-input-label">
                                                        <span>Full Name</span>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your new name"
                                                            value={newName}
                                                            onChange={(e) => setNewName(e.target.value)} />
                                                    </div>
                                                    <div className="membership-input-label">
                                                        <span>Username</span>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your new username"
                                                            value={newUsername}
                                                            onChange={(e) => setNewUsername(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="membership-input-label">
                                                    <span>E-mail</span>
                                                    <input
                                                        className="email-input-d"
                                                        type="email"
                                                        placeholder="Enter your new email"
                                                        value={newEmail}
                                                        onChange={(e) => setNewEmail(e.target.value)} />
                                                </div>
                                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                                <button className={`update-user-info-btn ${isInfoChanged() ? "" : "not-allowed"}`} style={{ cursor: isInfoChanged() ? "pointer" : "not-allowed", background: isInfoChanged() ? "#18371f" : "#cccccc", color: isInfoChanged() ? "#fff" : "#000" }} onClick={handleUpdateUserInfo} disabled={!isInfoChanged()}>Update Info</button>
                                            </div>
                                        </div>
                                    )}
                                </div><div className="menu1">
                                    {menu === "/userinformation/passwordchange" && (
                                        <div className="password-change">
                                            <input
                                                type="password"
                                                placeholder="Enter your current password"
                                                onChange={(e) => setOldPassword(e.target.value)} />
                                            <input
                                                type="password"
                                                placeholder="Enter your new password"
                                                onChange={(e) => setNewPassword(e.target.value)} />
                                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                                            <button onClick={handlePasswordChange}>Change Password</button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        {location.pathname === "/registeredaddress" && (
                            <>
                                {/* <div className="address-card">
                                    <div className="address-card-content">
                                        <div className="address-card-content-top">
                                            <div className="address-radio">
                                                <input
                                                    type="radio"
                                                    name="address"
                                                />
                                                <label className="custom-radio"></label>
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
                                        <img src={EditIcon} alt="Edit" style={{ cursor: "pointer" }} /> 
                                        <img src={DeleteIcon} alt="Delete" style={{ cursor: "pointer" }} />
                                    </div>
                                </div> */}
                            </>
                        )}
                    </div>
                </div>

            </>
            : window.location.href = '/login'
    );
};

export default UserDetail;
