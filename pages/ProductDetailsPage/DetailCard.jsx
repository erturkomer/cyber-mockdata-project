import React from "react";

const DetailCard = (props) => {
  return (
    <>
    <div className="detail-card">
      <img src={props.icon} alt="icon bulunamadi" />
      <div className="detail-card-text">
        <h5>{props.title}</h5>
        <span>{props.detail}</span>
      </div>
    </div>
    </>
  )
};

export default DetailCard;
