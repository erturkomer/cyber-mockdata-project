import React from "react";

const cargo = (props) => {
  return (
    <>
    <div className="cargo-icon">
        <img src={props.icon} alt="icon bulunamadi" />
        <div className="cargo-text">
            <h5>{props.title}</h5>
            <p>{props.details}</p>
        </div>
    </div>
    </>
  )
};

export default cargo;
