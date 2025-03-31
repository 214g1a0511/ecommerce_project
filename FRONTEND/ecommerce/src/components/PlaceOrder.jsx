import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify"

const PlaceOrder = ({ onConfirm }) => {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  const token = localStorage.getItem("Authorization");


  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      customerInfo,
      cartItems,
      totalPrice,
    };
    console.log(orderDetails)

    try {
        const headers = { Authorization: token };

      const response = await axios.post("http://localhost:5000/order/place-order", orderDetails,{headers});
      toast.success("Order has been placed !!")
      onConfirm();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container w-50 mt-4">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4 text-center">Place Your Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Shipping Address</label>
            <input type="text" name="address" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
          </div>

          <h5 className="text-center mb-3">Total Price: ₹ {totalPrice}</h5>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark   ">Place Order</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default PlaceOrder;


