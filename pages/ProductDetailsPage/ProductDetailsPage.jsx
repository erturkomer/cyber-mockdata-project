import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../components/allPageComponents/breadCrumbs";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setBrand(response.data.brand);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Breadcrumbs için hiyerarşi oluştur
  const breadcrumbsHierarchy = [
    { name: "Home", link: "/" },
    { name: "Catalog", link: "/catalog" },
    { name: "Smartphones", link: "/catalog/smartphones" },
    { name: brand, link: `/catalog/smartphones/${brand}` },
    { name: product.name, link: `/catalog/smartphones/${brand}/${id}` }
  ];

  return (
    <>
      <Breadcrumbs categories={breadcrumbsHierarchy} />
      <div className="main-info">
        {/* Ürün detayları */}
      </div>
    </>
  );
};
export default ProductDetailsPage;
