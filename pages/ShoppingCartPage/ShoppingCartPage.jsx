import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";

const ShoppingCartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}cart`)
            .then(response => setCart(response.data))
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    const handleRemoveFromCart = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}cart/${id}`)
            .then(() => setCart(cart.filter(item => item.id !== id)))
            .catch(error => console.error('Error deleting item from cart:', error));
    };


    const calculateTotal = () => cart.reduce((total, item) => total + parseFloat(item.price) * parseFloat(item.quantity), 0).toFixed(2);

    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart-content">
                <div className="shopping-cart-left">
                    <h2>Shopping Cart</h2>
                    {cart.length === 0 ? <p>Sepetiniz Boş</p>
                        :
                        cart.map(item => <CartItem key={item.id} cartItem={item} onRemove={handleRemoveFromCart}/>)}
                </div>
                <div className="shopping-cart-summary">
                    <h3>Order Summary</h3>
                    <p>Total Items: {cart.reduce((total, item) => total + parseFloat(item.quantity), 0)}</p>
                    <p>Total Price: ${calculateTotal()}</p>
                    <button>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;