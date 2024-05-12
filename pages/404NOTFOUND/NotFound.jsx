import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
    
    return (
        <>
            <div className="404-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", height: "88vh", background: "#232323" }}>
                <h1 style={{ fontSize: "128px", color: "white" }}>404</h1>
                <h3 style={{ textAlign: "center", fontSize: "32px", letterSpacing: "1px", height: "85px", color: "white" }}>Sorry, Page not<br />found</h3>
                <p style={{ fontSize: "24px", height: "48px", color: "white" }}>the page you requested was not found</p>
                <div className="button-404" style={{display:"flex"}}>
                    <Link to="/">
                        <button style={{ margin: "5px", background: "gray", color: "white", border: "0", outline: "none", padding: "16px 32px", cursor: "pointer", borderRadius: "16px" }}>GO BACK HOME</button>
                    </Link>
                    <a target="blank" href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvlHzsDsvPWlNfWqxJMNKZRwPDBSLhqCQKNthBzhHTsMSdGCrFTPFZSclRDkBnqjgdFzNB"><button style={{ margin: "5px", background: "white", color: "black", border: "0", outline: "none", padding: "16px 32px", cursor: "pointer", borderRadius: "16px" }}>BİZİMLE İLETİŞİME GEÇİN</button></a>
                </div>
            </div>
        </>
    )
};

export default NotFound;
