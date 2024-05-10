import React from "react";

const Line = (props) => {
    return (
        <>
            <div className="line">
                <p style={{color:"black"}}>{props.name}</p>
                <p style={{color:"black"}}>{props.title}</p>
            </div>
        </>
    )
};

export default Line;
