import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumbs from "../../components/allPageComponents/breadCrumbs";
import Accordion from "./Accordion";
import Product from '../../components/allPageComponents/products/product';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductList = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortMethod, setSortMethod] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc')
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + "products");
      const allProducts = response.data;
      setOriginalProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const breadcrumbsHierarchy = [
    { name: "Home", link: "/" },
    { name: "Catalog", link: "/catalog" },
    { name: "Smartphones", link: "/catalog/" }
  ];

  const indexOfLastProduct = currentPage * 9;
  const indexOfFirstProduct = indexOfLastProduct - 9;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / 9);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  const handleBrandCheckboxChange = (brand) => {
    let updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      updatedBrands = updatedBrands.filter(selectedBrand => selectedBrand !== brand);
    } else {
      updatedBrands.push(brand);
    }
    setSelectedBrands(updatedBrands);

    const filteredProducts = originalProducts.filter(product =>
      updatedBrands.length === 0 || updatedBrands.includes(product.brand)
    );
    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm) => {
    const filteredProducts = originalProducts.filter(product =>
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
  };

  const sortProducts = () => {
    let sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      if (sortMethod === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortMethod === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    sortProducts();
  }, [sortMethod, sortOrder]);

  return (
    <>
      <Breadcrumbs categories={breadcrumbsHierarchy} />
      <div className="product-list-inclusionary">
        <div className="product-list-container">
          <div className="product-list-filters-container">
            <div className="accordion-container">
              <Accordion handleSearch={handleSearch}
                Apple={originalProducts.filter(product => product.brand === "Apple").length}
                Samsung={originalProducts.filter(product => product.brand === "Samsung").length}
                Xiaomi={originalProducts.filter(product => product.brand === "Xiaomi").length}
                Poco={originalProducts.filter(product => product.brand === "Poco").length}
                Realme={originalProducts.filter(product => product.brand === "Realme").length}
                isFirstOpen="true" name="Brand" onCheckboxChange={handleBrandCheckboxChange} />
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
                <h3>Selected Products: <span>{filteredProducts.length}</span></h3>
                <Dropdown style={{background:"transparent"}}>
                  <Dropdown.Toggle style={{background:"transparent", color:"#000", width:"256px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 16px", border:"0.5px solid #D4D4D4"}} variant="success" id="dropdown-basic">
                    By rating
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { setSortMethod('name'); setSortOrder('asc'); }}>Name (A-Z)</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setSortMethod('name'); setSortOrder('desc'); }}>Name (Z-A)</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setSortMethod('price'); setSortOrder('asc'); }}>Price (Low to High)</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setSortMethod('price'); setSortOrder('desc'); }}>Price (High to Low)</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="product-list-list">
              {currentProducts.map(product => (
                <Product
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  brand={product.brand}
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
                    outline: "none", border: "0", cursor: "pointer", color: currentPage === i + 1 ? "white" : "black",
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