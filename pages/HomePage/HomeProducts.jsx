import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/allPageComponents/products/product";
import { useNavigate, useLocation } from "react-router-dom";

const HomeProducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(location.pathname);
    const [products, setProducts] = useState([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setMenu(location.pathname);
        if (location.state && location.state.scrollY !== undefined) {
            window.scrollTo({
                top : location.state.scrollY,
                behavior: "instant"
            });
        }
    }, [location]);

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

    const handleMenuClick = (path) => {
        setScrollY(window.scrollY);
        navigate(path, { replace: true, state: { scrollY: window.scrollY } });
    };

    return (
        <>
            <div className="home-products-container">
                <div className="home-products-tag">
                    <ul style={{ listStyleType: "none" }}>
                        <li onClick={() => handleMenuClick("/")}>
                            <span style={menu === "/" ? activeItemStyle : listItemStyle}>New Arrival</span>
                        </li>
                        <li onClick={() => handleMenuClick("/bestseller")}>
                            <span style={menu === "/bestseller" ? activeItemStyle : listItemStyle}>Bestseller</span>
                        </li>
                        <li onClick={() => handleMenuClick("/featuredproducts")}>
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
