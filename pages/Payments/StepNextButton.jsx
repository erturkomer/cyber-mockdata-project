import React from "react";

const StepNextButton = ({ background, name, onClick, width }) => {
    const textColor = background === "#fff" ? "#000" : "#fff";

    return (
        <>
            <button style={{
                width: width ? width : "217px",
                height: "64px",
                background: background,
                color: textColor,
                borderRadius: "6px",
                border: "1px solid #000",
                fontSize: "16px"
            }}
                onClick={onClick}>
                {name}
            </button>
        </>
    )
};

export default StepNextButton;
