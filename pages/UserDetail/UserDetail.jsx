import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserDetail = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [avatarUrl, setAvatarUrl] = useState(userDetails.avatarUrl);

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

    return (
        <>
            <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {userDetails && (
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center", width: "50%", height: "30vh", background: "#f8f8f8", border:"1px solid #000", borderRadius: "8px",
                        padding: "50px", gap: "64px"
                    }}>
                        <div className="avatar" style={{ borderRadius: "50%", overflow: "hidden", cursor: "pointer" }}>
                            <img src={avatarUrl} style={{ width: "150px" }} alt="User Avatar" onClick={() => document.getElementById('avatarInput').click()} />
                            <input type="file" id="avatarInput" style={{ display: "none" }} onChange={handleAvatarChange} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p>Email: {userDetails.email}</p>
                            <p>Full Name: {userDetails.fullName}</p>
                            <p>Username: {userDetails.userName}</p>
                        </div>
                        <button style={{ border: "1px solid #000", background: "transparent", padding: "12px 24px" }} onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserDetail;
