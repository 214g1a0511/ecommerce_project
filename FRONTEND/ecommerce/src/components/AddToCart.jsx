import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const AddToCart = () => {
  const token = localStorage.getItem("Authorization");
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const headers = { Authorization: token };
    await axios
      .get("http://localhost:5000/cart/getItems", { headers })
      .then((res) => {
        setCartProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    const headers = { Authorization: token };
    await axios.delete(`http://localhost:5000/cart/delete/${id}`, { headers });
    setCartProducts((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartProducts((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuyNow = () => {
    navigate("/place-order", { state: { cartItems: cartProducts, totalPrice } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Cart</h2>
      <div className="row">
        {cartProducts?.map((product) => (
          <div className="col-4" key={product._id}>
            <Card
              props={product}
              buttonText="Buy Now"
              showQuantity={true}
              handleDelete={handleDelete}
              updateQuantity={updateQuantity}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <h4>Total Price: ₹{totalPrice}</h4>
        <button className="btn btn-dark mt-2" onClick={handleBuyNow}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;




