import React from "react";

const Category = (props) => {
  return (
    <>
    <div className="home-category-card">
        <img src={props.icon} alt="icon bulunamadi." />
        <p>{props.name}</p>
    </div>
    </>
  )
};

export default Category;
