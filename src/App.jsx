import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage/Home.jsx";
import Header from "../components/allPageComponents/header.jsx";
import Footer from "../components/allPageComponents/footer/footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
