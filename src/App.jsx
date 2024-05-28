import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import './App.css'

function App() {
  const isHomePage = location.pathname === "/";
  return (
    <>
      <Header />
      {
        (location.pathname === "/payments/step-1" ||
          location.pathname === "/payments/step-2" ||
          location.pathname === "/payments/step-3") ?
          <PaymentSteps /> :
          ""
      }
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
