import React from "react";
import Remove from "./icon/remove.svg";
import Edit from "./icon/edit.svg";
import NoEdit from "./icon/no-edit.svg";

const CartItem = ({ cartItem, onRemove }) => {
    const { id, title, brand, storage, price, quantity, color, screenSize, productImg } = cartItem;

    const handleRemoveClick = () => {
        onRemove(id);
    };

    return (
        <>
            <div className="cart-item">
                <div className="cart-item-image" style={{ display: "flex", alignItems: "center",justifyContent:"center"}}>
                    <img style={{ width: "90px", height: "90px" }} src={productImg} alt={title} />
                </div>
                <div className="cart-item-content">
                    <div className="cart-item-info">
                        <h5 style={{ fontWeight: "500", fontSize: "16px", lineHeight: "24px", color: "#000" }}>{brand} {title} {storage} {color} {screenSize}</h5>
                        <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: "24px", color: "#000" }}>#{id}</span>
                    </div>
                    <div className="cart-item-right-side">
                        <div className="cart-counter">
                            <button style={{ width: "24px", height: "24px", background: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
                                <img src={NoEdit} alt="icon undefined" style={{ width: "24px", height: "24px" }} />
                            </button>
                            <div className="quantity-control">
                                {quantity}
                            </div>
                            <button style={{ width: "24px", height: "24px", background: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
                                <img src={Edit} alt="icon undefined" style={{ width: "24px", height: "24px" }} />
                            </button>
                        </div>
                        <span>{price}</span>
                        <button onClick={handleRemoveClick} style={{ width: "24px", height: "24px", background: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>
                            <img src={Remove} alt="icon undefined" style={{ width: "24px", height: "24px" }} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="devider"></div>
        </>
    );
};

export default CartItem;
