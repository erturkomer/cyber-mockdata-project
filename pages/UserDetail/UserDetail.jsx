import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserDetail = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [avatarUrl, setAvatarUrl] = useState(userDetails && userDetails.avatarUrl);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userDetails");
        window.location.href = "/";
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
                    await axios.put(`http://localhost:3000/users/${userDetails.id}`, updatedUserDetails);
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
        const defaultAvatarUrl = 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg';
        setAvatarUrl(defaultAvatarUrl);
        const updatedUserDetails = {
            ...userDetails,
            avatarUrl: defaultAvatarUrl
        };
        localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
        axios.put(`http://localhost:3000/users/${userDetails.id}`, updatedUserDetails)
            .then(() => {
                toast.success("Image deleted successfully", { autoClose: 2000 });
            })
            .catch((error) => {
                console.error('Error deleting avatar:', error);
                toast.error("Error deleting image", { autoClose: 2000 });
            });
    };
    console.log(isLoggedIn)

    return (
        isLoggedIn ?
            <>
                <ToastContainer />
                <div style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    padding: "30px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                    color: "#fff"
                }}>
                    {userDetails && (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "80%",
                            padding: "50px",
                            backgroundColor: "#2a2a2a",
                            borderRadius: "12px",
                            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div className="avatar" style={{ borderRadius: "50%", overflow: "hidden", cursor: "pointer", marginBottom: "16px" }}>
                                    <img
                                        src={avatarUrl}
                                        style={{ width: "150px", height: "150px", objectFit: "cover", border: "4px solid #fff" }}
                                        alt="User Avatar"
                                        onClick={() => document.getElementById('avatarInput').click()}
                                    />
                                    <input
                                        type="file"
                                        id="avatarInput"
                                        style={{ display: "none" }}
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                                <button
                                    style={{
                                        border: "none",
                                        backgroundColor: "#000",
                                        color: "#ffffff",
                                        padding: "10px 20px",
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        marginTop: "12px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                    }}
                                    onClick={handleAvatarDelete}
                                >
                                    Delete Avatar
                                </button>
                            </div>
                            <div style={{ marginTop: "20px", textAlign: "center" }}>
                                <p style={{ margin: "10px 0", fontSize: "18px", color: "#ffffff" }}>
                                    <strong>Email:</strong> {userDetails.email}
                                </p>
                                <p style={{ margin: "10px 0", fontSize: "18px", color: "#ffffff" }}>
                                    <strong>Full Name:</strong> {userDetails.fullName}
                                </p>
                                <p style={{ margin: "10px 0", fontSize: "18px", color: "#ffffff" }}>
                                    <strong>Username:</strong> {userDetails.userName}
                                </p>
                            </div>
                            <button
                                style={{
                                    border: "none",
                                    backgroundColor: "#000",
                                    color: "#ffffff",
                                    padding: "12px 24px",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                    marginTop: "20px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>
            </>
            :  window.location.href = '/login'
    );
};

export default UserDetail;
