import React from "react";

const AddToCard = (props) => {
    return (
        <>
            <div className="add-to-card" style={{ color: props.color, background: props.background, cursor: props.cursor }} onClick={props.onClick}>
                {props.title}
            </div>
        </>
    );
};

export default AddToCard;
