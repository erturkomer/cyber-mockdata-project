import React from "react";

const StepNextButton = ({ background, name }) => {
    const textColor = background === "#fff" ? "#000" : "#fff";

    return (
        <>
            <button style={{
                width:"207px",
                height:"64px",
                background: background, 
                color: textColor, 
                borderRadius: "6px", 
                border: "1px solid #000", 
                fontSize: "16px" 
            }}>
                {name}
            </button>
        </>
    )
};

export default StepNextButton;
