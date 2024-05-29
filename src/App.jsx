import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0, behavior: "instant"
    });
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();

  return (
    <>
      {
        (location.pathname != "/signup" &&
          location.pathname != "/login" ?
          <Header />
          : ""
        )
      }
      {
        (location.pathname === "/payments/step-1" ||
          location.pathname === "/payments/step-2" ||
          location.pathname === "/payments/step-3") ?
          <PaymentSteps /> :
          ""
      }
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bestseller" element={<HomePage />} />
        <Route path="/featuredproducts" element={<HomePage />} />
        <Route path="/catalog/smartphones/productdetails/:id" element={<ProductDetailsPage />} />
        <Route path="/catalog/smartphones" element={<ProductList />} />
        <Route path="/shoppingcart" element={<ShoppingCartPage />} />
        <Route path="/payments/step-1" element={<PaymentStep1Page />} />
        <Route path="/payments/step-2" element={<PaymentStep2Page />} />
        <Route path="/payments/step-3" element={<PaymentStep3Page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        (location.pathname != "/signup" &&
          location.pathname != "/login" ?
          <Footer />
          : ""
        )
      }    </>
  )
}

export default App;
