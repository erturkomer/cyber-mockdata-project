import axios from "axios";
import React, { useState, useEffect } from "react";
import Product from "../../components/allPageComponents/products/product";

const DiscountProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "products");
            const allProducts = response.data;
    
            const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
    
            const selectedProducts = shuffledProducts.slice(0, 4);
    
            setProducts(selectedProducts);
        } catch (error) {
            console.error('Ürünleri çekerken bir hata oluştu:', error);
        }
    };

    return (
        <>
            <div className="related-container">
                <div className="related-text">
                    <h2>Related Products</h2>
                </div>
                <div className="related-products-container">
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

export default DiscountProducts;
