import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from "../../components/allPageComponents/breadCrumbs";
const ProductList = () => {
  const breadcrumbsHierarchy = [
    { name: "Home", link: "/" },
    { name: "Catalog", link: "/catalog/smartphones" },
    { name: "Smartphones", link: "/catalog/smartphones" }
  ];
  return (
    <>

      <Breadcrumbs categories={breadcrumbsHierarchy} />
    </>
  )
};

export default ProductList;
