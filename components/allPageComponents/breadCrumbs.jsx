import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ categories }) => {
  return (
    <div className="bread-crumbs-container">
      {categories.map((category, index) => {
        const isLast = index === categories.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <span className="breadcrumb-separator"> {<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#A4A4A4" />
            </svg>} </span>}
            <span className="breadcrumb-separator">
              {isLast ? (
                <span className="breadcrumb-item breadcrumb-item-active">{category.name}</span>
              ) : (
                <Link to={category.link} className="breadcrumb-item">{category.name}</Link>
              )}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;