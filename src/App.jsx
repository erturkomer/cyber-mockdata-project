import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage/Home.jsx";
import Header from "../components/allPageComponents/header.jsx";
import Footer from "../components/allPageComponents/footer/footer.jsx";
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.jsx';
import ProductList from '../pages/ProductPage/ProductList.jsx';
import NotFound from '../pages/404NOTFOUND/NotFound.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bestseller" element={<HomePage />} />
        <Route path="/featuredproducts" element={<HomePage />} />
        <Route path="/catalog/smartphones/productdetails/:id" element={<ProductDetailsPage />} />
        <Route path="/catalog/smartphones" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
