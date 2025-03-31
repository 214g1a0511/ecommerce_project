import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Register from "../components/Register";
import Login from "../components/Login";
import AddToCart from "../components/AddToCart";
import Wishlist from "../components/Wishlist";
import SingleProduct from "../components/SingleProduct";
import UserPage from "../components/UserPage";
import PlaceOrder from "../components/PlaceOrder";
export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cartPage" element={<AddToCart/>}></Route>
        <Route path="/wishlistPage" element={<Wishlist/>}></Route>
        <Route path="/singleProductPage/:name" element={<SingleProduct/>}></Route>
        <Route path="/userPage" element={<UserPage/>}></Route>
        <Route path="/place-order" element={<PlaceOrder/>}></Route>




      </Routes>
      
    </div>
  );
};
