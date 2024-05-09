import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Product from "../../components/allPageComponents/products/product";

const HomeProducts = () => {
    const [menu, setMenu] = useState("/");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, [menu]);

    const fetchData = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "products");
            const allProducts = response.data;

            let filteredProducts = [];
            if (menu === "/") {
                filteredProducts = allProducts.slice(0, 8);
            } else if (menu === "/bestseller") {
                filteredProducts = allProducts.slice(8, 16);
            } else if (menu === "/featuredproducts") {
                filteredProducts = allProducts.slice(16, 24);
            }

            setProducts(filteredProducts);
        } catch (error) {
            console.error('Ürünleri çekerken bir hata oluştu:', error);
        }
    };

    return (
        <div className="home-products-container">
            <div className="home-products-tag">
                <ul style={{ listStyleType: "none" }}>
                    <li onClick={() => { setMenu("/") }}>
                        <Link to="/" style={{ textDecoration: "none", color: menu === "/" ? "black" : "#8B8B8B" , display: "block", height: "100%", borderBottom: menu === "/" ? "2px solid black" : "none" }}>New Arrival</Link>
                    </li>
                    <li onClick={() => { setMenu("/bestseller") }}>
                        <Link to="/bestseller" style={{ textDecoration: "none", color: menu === "/bestseller" ? "black" : "#8B8B8B" , display: "block", height: "100%", borderBottom: menu === "/bestseller" ? "2px solid black" : "none" }}>Bestseller</Link>
                    </li>
                    <li onClick={() => { setMenu("/featuredproducts") }}>
                        <Link to="/featuredproducts" style={{ textDecoration: "none", color: menu === "/featuredproducts" ? "black" : "#8B8B8B" , display: "block", height: "100%", borderBottom: menu === "/featuredproducts" ? "2px solid black" : "none" }}>Featured Products</Link>
                    </li>
                </ul>
            </div>
            <div className="products-container">
                {products.map(product => (
                    <Product id={product.id} key={product.id} name={product.name} image={product.productImage} color={product.color} price={product.price} storage={product.storage} mainCamera={product.mainCamera} cpu={product.cpu}/>
                ))}
            </div>
        </div>
    );
};

export default HomeProducts;