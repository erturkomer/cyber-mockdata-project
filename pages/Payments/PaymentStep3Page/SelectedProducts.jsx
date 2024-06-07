import { useState } from "react";

const SelectedProducts = ({ productTitle, productImg, productBrand, productPrice, productStorage }) => {
    const [product, setProduct] = useState();
    return (
        <>
            <div className="step-3-selected-added-product">
                <img style={{width:"40px"}} src={productImg} />
                <div className="step-3-selected-added-product-text">
                    <p>{productBrand} {productTitle} {productStorage}</p>
                    <span>${productPrice}</span>
                </div>
            </div>
        </>
    )
};

export default SelectedProducts;
