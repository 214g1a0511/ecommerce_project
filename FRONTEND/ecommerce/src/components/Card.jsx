import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Card.css";
import { IoIosHeartEmpty } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import {toast,ToastContainer} from "react-toastify"

import axios from "axios";

const Card = ({
  props,
  buttonText = "Add To Cart",
  showQuantity = false,
  handleDelete,
  handleBuyNow ,
  updateQuantity,
}) => {
  const navigate = useNavigate();
  const [wishlistProducts, setWishlistProducts] = useState();
  const [cartProducts, setCartProducts] = useState();
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("Authorization");

  const handleQuantityChange = async (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);

      if (showQuantity) {
        try {
          const res = await axios.put(
            `http://localhost:5000/cart/edit/${props._id}`,
            { quantity: newQuantity },
            { headers: { Authorization: token } }
          );

          updateQuantity(props._id, res.data.quantity);
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      }
    }
  };

  const navigateToWishlist = async () => {
    const headers = { Authorization: token };
    await axios
      .post(
        "http://localhost:5000/wishlist/add",
        { title: props.title, price: props.price, image: props.image },
        { headers }
      )
      .then((res) => {
        setWishlistProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const navigateToCart = async () => {
    const headers = { Authorization: token };
    await axios
      .post(
        "http://localhost:5000/cart/add",
        {
          title: props.title,
          price: props.price ,
          image: props.image,
          quantity,
        },
        { headers }
      )
      .then((res) => {
        setCartProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card m-2">
        <div className="image-container">
          <img
            className="card-img-top"
            src={props.image}
            alt="Card image cap"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h5>₹ {props.price * quantity}</h5>

          {showQuantity && (
            <div className="d-flex  my-2">
              <button
                className="btn btn-outline-dark btn-sm me-2"
                onClick={() => handleQuantityChange(-1)}
              >
                −
              </button>
              <span className="fs-5 fw-bold">{quantity}</span>
              <button
                className="btn btn-outline-dark btn-sm ms-2"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-dark"
              onClick={buttonText === "Buy Now" ? handleBuyNow : navigateToCart}
            >
              {buttonText}
            </button>

            {showQuantity ? (
              <div
                className="ms-2 "
                onClick={() => handleDelete(props._id)}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineDelete size={30} />
              </div>
            ) : (
              <div
                className="ms-2"
                onClick={navigateToWishlist}
                style={{ cursor: "pointer" }}
              >
                <IoIosHeartEmpty size={30} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Card