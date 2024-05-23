import React from "react";

const CartItem = ({ cartItem, onRemove }) => {
    const { id, title, price, quantity } = cartItem;

    const handleRemoveClick = () => {
        onRemove(id);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={id} alt={title} />
            </div>
            <div className="cart-item-info">
                <h5>{title}</h5>
                <p>{price}</p>
                <div className="quantity-control">
                    {quantity}
                </div>
            </div>
            <div className="cart-item-remove">
                <button onClick={handleRemoveClick}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
