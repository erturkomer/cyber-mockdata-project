import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumbs from "../../components/allPageComponents/breadCrumbs";
import Accordion from "./Accordion";
import Product from '../../components/allPageComponents/products/product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + "products");
      const allProducts = response.data;
      setProducts(allProducts);
    } catch (error) {
      console.error('Ürünleri çekerken bir hata oluştu:', error);
    }
  }

  const breadcrumbsHierarchy = [
    { name: "Home", link: "/" },
    { name: "Catalog", link: "/catalog" },
    { name: "Smartphones", link: "/catalog/smartphones" }
  ];

  // Sayfadaki son ürünün indeksi
  const indexOfLastProduct = currentPage * 9;
  // Sayfadaki ilk ürünün indeksi
  const indexOfFirstProduct = indexOfLastProduct - 9;
  // Şu anki sayfadaki ürünler
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Toplam sayfa sayısı
  const totalPages = Math.ceil(products.length / 9);

  // Sayfa değiştirme işlevi
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Breadcrumbs categories={breadcrumbsHierarchy} />
      <div className="product-list-inclusionary">
        <div className="product-list-container">
          <div className="product-list-filters-container">
            <div className="accordion-container">
              <Accordion name="Brand" />
              <Accordion name="Battery capacity" />
              <Accordion name="Screen type" />
              <Accordion name="Screen diagonal" />
              <Accordion name="Protection class" />
              <Accordion name="Built-in memory" />
            </div>
          </div>
          <div className="product-list-products-container">
            <div className="product-list-top-part">
              <div className="left-side-products">
                <h3>Selected Products: <span>{products.length}</span></h3>
              </div>
            </div>
            <div className="product-list-list">
              {currentProducts.map(product => (
                <Product
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  image={product.productImage}
                  color={product.color}
                  price={product.price}
                  storage={product.storage}
                  mainCamera={product.mainCamera}
                  cpu={product.cpu}
                />
              ))}
            </div>
            <div className="pagination" style={{ gap: "8px", display: "flex" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  style={{
                    outline: "none", border: "0", cursor: "pointer", color:currentPage === i + 1 ? "white" : "black",
                    fontSize: "16px", lineHeight: "24px", letterSpacing: "3%", fontWeight: "500",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: currentPage === i + 1 ? "black" : "#F6F6F6", borderRadius: "5px",
                    width: "32px", height: "32px"
                  }}
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;