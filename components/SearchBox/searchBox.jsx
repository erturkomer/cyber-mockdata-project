import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "../allPageComponents/jsxSvg/searchIcon.jsx";
import axios from "axios";
import "./SearchBox.css";
import SearchBoxItem from "./SearchBoxItem.jsx";

const SearchBox = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef(null);
    const [lastTraveled, setLastTraveled] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const userId = userDetails?.id;

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const addProductToLastTraveled = async (userId) => {
        if (userId) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`);
                const userData = response.data;
                setLastTraveled(userData.lastTraveledProducts);
            } catch (error) {
            }
        }   
    }
    addProductToLastTraveled(userId);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const searchItem = async (value = "") => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "products");
            const allProducts = response.data;
            let filteredProducts;

            if (value.trim() === "") {
                setProducts([]);
                return;
            } else {
                const searchWords = value.toLowerCase().split(" ");

                filteredProducts = allProducts.filter(product =>
                    searchWords.some(word =>
                        (product.name && product.name.toLowerCase().includes(word)) ||
                        (product.brand && product.brand.toLowerCase().includes(word))
                    )
                );

                filteredProducts.sort((a, b) => {
                    const aMatches = searchWords.reduce((totalMatches, word) =>
                        totalMatches +
                        ((a.name && a.name.toLowerCase().match(new RegExp(word, "g")) || []).length +
                            (a.brand && a.brand.toLowerCase().match(new RegExp(word, "g")) || []).length), 0);
                    const bMatches = searchWords.reduce((totalMatches, word) =>
                        totalMatches +
                        ((b.name && b.name.toLowerCase().match(new RegExp(word, "g")) || []).length +
                            (b.brand && b.brand.toLowerCase().match(new RegExp(word, "g")) || []).length), 0);
                    return bMatches - aMatches;
                });

                filteredProducts = filteredProducts.slice(0, 6);
            }
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Ürünleri çekerken bir hata oluştu:', error);
        }
    };


    const handleProductClick = async (productId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}products/${productId}`);
            navigate("/catalog/smartphones/productdetails/" + productId);
            setIsMenuOpen(false);
            setSearchTerm("");
        } catch (error) {
            console.error('Ürün detaylarını çekerken bir hata oluştu:', error);
        }
    };

    const handleLastVisitedNavigate = (productId) => {
        navigate("/catalog/smartphones/productdetails/" + productId);
        setIsMenuOpen(false);
        setSearchTerm("");
    }

    const handleFocus = () => {
        setIsMenuOpen(true);
        searchItem(searchTerm);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        if (value === "") {
            setProducts([]);
        } else {
            searchItem(value);
        }
    };

    return (
        <div className="search-box-wrapper" ref={wrapperRef}>
            <div className="search-box-container" style={{ border: isMenuOpen === true ? "1px solid #ccc" : "0px" }}>
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                />
            </div>
            {isMenuOpen && (
                <div className="menus">
                    <div className="search-menu">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <SearchBoxItem
                                    id={product.id}
                                    key={product.id}
                                    name={product.name}
                                    image={product.productImage}
                                    color={product.color}
                                    price={product.price}
                                    brand={product.brand}
                                    storage={product.storage}
                                    battery={product.batteryCapacity}
                                    screenSize={product.screenSize}
                                    onProductClick={handleProductClick}
                                />
                            ))
                        ) : (
                            <div style={{ padding: "24px" }}>{searchTerm ? "No products found matching your search criteria." : "Enter at least 1 character to search."}</div>
                        )}
                    </div>

                    <div className="last-traveled" style={{ padding: "24px 28px" }}>
                        {lastTraveled && lastTraveled.length > 0 && (
                            <>
                                <h4 style={{ fontWeight: "600", color: "gray", marginBottom: "16px" }}>Recently Viewed Products</h4>
                                <div key={lastTraveled.id} style={{ width: "450px" }}>
                                    {lastTraveled.slice(Math.max(lastTraveled.length - 4, 0)).map((product) => (
                                        <div style={{ display: "flex", width: "100%", height: "80px", alignItems: "center", justifyContent: "space-between", padding: "0 16px 0 0", background: "#f8f8f8", borderRadius: "8px", cursor: "pointer" }} onClick={() => handleLastVisitedNavigate(product.id)}>
                                            <div>
                                                <img style={{ width: "50px" }} src={product.image} alt={product.name} />
                                                <span><strong>{product.brand}</strong> {product.name} {product.storage}</span>
                                            </div>
                                            <span>${product.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {!lastTraveled || lastTraveled.length === 0 && (
                            ""
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default SearchBox;
