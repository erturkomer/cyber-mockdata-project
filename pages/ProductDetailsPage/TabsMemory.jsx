import React, { useState } from "react";

const TabsMemory = (props) => {
    const [tabColor, setTabColor] = useState("#6F6F6F"); // Eski rengi state olarak sakla
    const [borderColor, setBorderColor] = useState("#D5D5D5"); // Eski rengi state olarak sakla

    const handleClick = () => {
        // Tab'ın rengini güncelle
        if (tabColor === "#000000" && borderColor === "#000000") {
            setTabColor("#6F6F6F"); // Eğer siyahsa, eski rengi geri getir
            setBorderColor("#D5D5D5"); // Eğer siyahsa, eski rengi geri getir
        } else {
            setTabColor("#000000"); // Değilse, siyah yap
            setBorderColor("#000000"); // Değilse, siyah yap
        }
    };

    return (
        <div className="tabs-memory" style={{ color: tabColor, borderColor: borderColor }} onClick={handleClick}>
            {props.title}
        </div>
    );
};

export default TabsMemory;