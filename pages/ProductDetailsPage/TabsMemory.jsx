import React, { useState } from "react";

const TabsMemory = (props) => {
    const [tabColor, setTabColor] = useState("#6F6F6F");
    const [borderColor, setBorderColor] = useState("#D5D5D5");

    const handleClick = () => {
        // Tab'ın rengini güncelle
        if (tabColor === "#000000" && borderColor === "#000000") {
            setTabColor("#6F6F6F");
            setBorderColor("#D5D5D5");
        } else {
            setTabColor("#000000");
            setBorderColor("#000000");
        }
    };

    return (
        <div className="tabs-memory" style={{ color: tabColor, borderColor: borderColor }} onClick={handleClick}>
            {props.title}
        </div>
    );
};

export default TabsMemory;