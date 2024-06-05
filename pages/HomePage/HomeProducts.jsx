import React, { useState, useEffect } from "react";
import axios from "axios";
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

    const listItemStyle = {
        color: "#8B8B8B",
        cursor: "pointer",
    };

    const activeItemStyle = {
        color: "black",
        borderBottom: "2px solid black",
    };

    return (
        <>
            <div className="home-products-container">
                <div className="home-products-tag">
                    <ul style={{ listStyleType: "none" }}>
                        <li onClick={() => { setMenu("/") }}>
                            <span style={menu === "/" ? activeItemStyle : listItemStyle}>New Arrival</span>
                        </li>
                        <li onClick={() => { setMenu("/bestseller") }}>
                            <span style={menu === "/bestseller" ? activeItemStyle : listItemStyle}>Bestseller</span>
                        </li>
                        <li onClick={() => { setMenu("/featuredproducts") }}>
                            <span style={menu === "/featuredproducts" ? activeItemStyle : listItemStyle}>Featured Products</span>
                        </li>
                    </ul>
                </div>
                <div className="products-container">
                    {products.map(product => (
                        <Product
                            id={product.id}
                            key={product.id}
                            brand={product.brand}
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
            </div>
        </>
    );
};

export default HomeProducts;
