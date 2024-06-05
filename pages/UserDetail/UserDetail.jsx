import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./UserDetail.css";
import { useLocation } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const UserDetail = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [avatarUrl, setAvatarUrl] = useState('');
    const [menu, setMenu] = useState("/");
    const [newName, setNewName] = useState(userDetails.fullName);
    const [newEmail, setNewEmail] = useState(userDetails.email);
    const [newUsername, setNewUsername] = useState(userDetails.userName);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();

    useEffect(() => {
        if (userDetails && userDetails.avatarUrl) {
            setAvatarUrl(userDetails.avatarUrl);
        } else {
            const defaultAvatarUrl = generateDefaultAvatarUrl(userDetails.fullName);
            setAvatarUrl(defaultAvatarUrl);
        }
    }, [userDetails]);

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
                        <div className="user-info-heading">My User Information</div>
                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        ><IoLogOutOutline />Logout
                        </button>
                    </div>
                    <div className="right-side">
                        <h2>My user information</h2>
                        <ul className="user-information" style={{ listStyleType: "none" }}>
                            <li className={menu === "/" ? "active" : ""} onClick={() => setMenu("/")}>
                                <span>Membership information</span>
                            </li>
                            <li className={menu === "/password-change" ? "active" : ""} onClick={() => setMenu("/password-change")}>
                                <span>Password change</span>
                            </li>
                        </ul>
                        <div className="menu">
                            {menu === "/" && (
                                <div className="profile-information">
                                    <h4>Profile information</h4>
                                    <p>Here you can edit the information we need to optimize your experience at Cyber.</p>
                                    <div className="membership-info">
                                        <input
                                            type="text"
                                            placeholder="Enter your new name"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter your new username"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Enter your new email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                        />
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                                        <button onClick={handleUpdateUserInfo}>Update Info</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="menu1">
                            {menu === "/password-change" && (
                                <div className="password-change">
                                    <input
                                        type="password"
                                        placeholder="Enter your current password"
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter your new password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <button onClick={handlePasswordChange}>Change Password</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
            : window.location.href = '/login'
    );
};

export default UserDetail;
