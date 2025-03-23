import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Register from "../components/Register";
import Login from "../components/Login";
import AddToCart from "../components/AddToCart";
export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cartPage" element={<AddToCart/>}></Route>
      </Routes>
    </div>
  );
};
