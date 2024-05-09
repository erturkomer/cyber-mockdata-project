import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/allPageComponents/products/product";

const DiscountedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "products");
            const allProducts = response.data;

            let productsOne = allProducts.slice(12, 16);

            setProducts(productsOne);
        } catch (error) {
            console.error('Ürünleri çekerken bir hata oluştu:', error);
        }
    };

    return (
        <>
            <div className="discounted-container">
                <div className="discounted-text">
                    <h2>Discounted up to -50%</h2>
                </div>
                <div className="discounted-products-container">
                    {products.map(product => (
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
            </div>
        </>
    );
};

export default DiscountedProducts;