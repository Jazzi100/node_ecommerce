import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./Template/Header";
import Footer from "./Template/Footer";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AllProducts from "./pages/Admin/AllProducts";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import AllUsers from "./pages/Admin/AllUsers";

function MainTemplate() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/admin-all-products" element={<AllProducts />} />
          <Route path="/all-users" element={<AllUsers />} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default MainTemplate;
