import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "../pages/HomePage/Home.jsx";
import Header from "../components/allPageComponents/header.jsx";
import Footer from "../components/allPageComponents/footer/footer.jsx";
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.jsx';
import ProductList from '../pages/ProductPage/ProductList.jsx';
import NotFound from '../pages/404NOTFOUND/NotFound.jsx';
import ShoppingCartPage from '../pages/ShoppingCartPage/ShoppingCartPage.jsx';
import PaymentStep1Page from '../pages/Payments/PaymentStep1Page/PaymentStep1.jsx';
import PaymentStep2Page from '../pages/Payments/PaymentStep2Page/PaymentStep2.jsx';
import PaymentStep3Page from '../pages/Payments/PaymentStep3Page/PaymentStep3.jsx';
import PaymentSteps from '../components/allPageComponents/PaymentSteps.jsx';
import Register from '../register-login/Register.jsx';
import Login from '../register-login/Login.jsx';
import UserDetail from '../pages/UserDetail/UserDetail.jsx';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from '../pages/ShoppingCartPage/CartItem.jsx';
import Favoritelist from '../pages/ProductPage/FavoritesPage/FavoriteList.jsx';
import AdminPanel from '../pages/AdminPanel/AdminPanel.jsx';
import AdminUserList from "../pages/AdminPanel/UserList.jsx";
import PrivateRoute from './PrivateRoute.jsx';
import PaymentComplated from '../pages/Payments/PaymentComplated.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    (location.pathname === "/payments/step-1" ||
      location.pathname === "/payments/step-2" ||
      location.pathname === "/payments/step-3") ||
      location.pathname === "/payments/step-3/paypal" ||
      location.pathname === "/payments/step-3/paypal-credit" ? " " :
      
      window.scrollTo({
        top: 0, behavior: "instant"
      });
}, [pathname]);

return null;
};

function App() {
  const location = useLocation();
  const [totalUnchangeable, setTotalUnchangeable] = useState(0);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(5);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userId = userDetails?.id;

  const fetchCartData = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`);
        const user = response.data;
        const totalUnchangeables = user.cart.reduce((total, item) => total + item.unchangeable, 0);
        setTotalUnchangeable(totalUnchangeables);
      }
    } catch (error) {
      console.error("Error fetching user's cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  });

  const handleAddToCart = (id) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/login";
    } else {
      axios.get(`${import.meta.env.VITE_API_URL}users/${userId}`)
        .then((response) => {
          const user = response.data;
          if (!user.cart) {
            user.cart = [];
          }

          const cartItem = user.cart.find((item) => item.productId === id);
          if (cartItem) {
            cartItem.quantity += 1;
          } else {
            user.cart.push({
              title: product.name,
              brand: product.brand,
              storage: product.storage,
              color: product.color,
              screenSize: product.screenSize,
              price: product.price,
              productImg: product.productImage,
              productId: id,
              quantity: 1,
              unchangeable: 1,
            });
          }
          axios.patch(`${import.meta.env.VITE_API_URL}users/${userId}`, { cart: user.cart })
            .then(() => {
              fetchCartData();
            })
            .catch(() => {
              toast.error("An error occurred while updating the cart.");
            });
        })
        .catch(() => {
          toast.error("An error occurred while fetching user data.");
        });
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (userDetails && userDetails.id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`)
        .then((res) => {
          const userCart = res.data.cart || [];
          const updatedCart = userCart.filter(
            (item) => item.productId !== productId
          );
          axios
            .put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, {
              ...res.data,
              cart: updatedCart,
            })
            .then(() => {
              setCart(updatedCart);
            })
            .catch((error) => console.error("Error updating cart:", error));
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  };

  const Increment = async (productId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`);
      const userData = response.data;

      const userCart = userData.cart;

      const productIndex = userCart.findIndex(item => item.productId === productId);

      if (productIndex !== -1) {
        userCart[productIndex].quantity += 1;

        const res = await axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, {
          ...userData,
          cart: userCart
        });
        setCart(res.data.cart)

        setNewQuantity(prevQuantity => prevQuantity + 1);

      } else {
        console.log("Product not found in cart!");
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const Decrement = async (productId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`);
      const userData = response.data;

      const userCart = userData.cart;

      const productIndex = userCart.findIndex(item => item.productId === productId);

      if (productIndex !== -1) {
        if (userCart[productIndex].quantity > 1) {
          userCart[productIndex].quantity -= 1;

          const res = await axios.put(`${import.meta.env.VITE_API_URL}users/${userDetails.id}`, {
            ...userData,
            cart: userCart
          });

          setNewQuantity(prevQuantity => prevQuantity - 1);

          setCart(res.data.cart)

        } else {
          console.log("Quantity already at minimum!");
        }
      } else {
        console.log("Product not found in cart!");
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const showHeaderFooter = !["/signup", "/login", "/adminpanel", "/adminpanel/userlist"].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header cartCount={totalUnchangeable} />}
      {
        (location.pathname === "/payments/step-1" ||
          location.pathname === "/payments/step-2" ||
          location.pathname === "/payments/step-3") ||
          location.pathname === "/payments/step-3/paypal" ||
          location.pathname === "/payments/step-3/paypal-credit" ?
          <PaymentSteps /> : 
          ""
      }
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bestseller" element={<HomePage />} />
        <Route path="/featuredproducts" element={<HomePage />} />
        <Route path="/catalog/smartphones/:brand/:id" element={<ProductDetailsPage handleAddToCart={handleAddToCart} product={product} setProduct={setProduct} />} />
        <Route path="/catalog/smartphones" element={<ProductList />} />
        <Route path="/shoppingcart" element={<ShoppingCartPage handleRemoveFromCart={handleRemoveFromCart} cart={cart} setCart={setCart} Increment={Increment} Decrement={Decrement} />} />
        <Route path="/payments/step-1" element={<PaymentStep1Page />} />
        <Route path="/payments/step-2" element={<PaymentStep2Page />} />
        <Route path="/payments/step-3" element={<PaymentStep3Page />} />
        <Route path="/paymentcomplated" element={<PaymentComplated />} />
        <Route path="/payments/step-3/paypal" element={<PaymentStep3Page />} />
        <Route path="/payments/step-3/paypal-credit" element={<PaymentStep3Page />} />
        <Route path="/favorites" element={<Favoritelist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/userinformation" element={<UserDetail />} />
        <Route path="/registeredaddress" element={<UserDetail />} />
        <Route path="/userinformation/passwordchange" element={<UserDetail />} />
        <Route path="/adminpanel" element={<PrivateRoute element={<AdminPanel />} />} />
        <Route path="/adminpanel/userlist" element={<PrivateRoute element={<AdminUserList />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
