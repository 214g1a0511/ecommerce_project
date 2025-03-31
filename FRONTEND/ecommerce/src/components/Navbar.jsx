import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import logo from "../assets/create logo regardig shopping mart.jpg";
import { FaUserCircle } from "react-icons/fa";

import { IoIosHeartEmpty } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { loginContext } from "../contexts/AuthContext";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import Dashboard from "./Dashboard";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, loginToken } = useContext(loginContext);
  
  const token = localStorage.getItem("Authorization");
  const [searchItem, setSearchItem] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchItem) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchProducts(searchItem);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchItem]);

  const searchProducts = async (searchItem) => {
    const headers = { Authorization: token };
    if (searchItem == "undefined") {
      return toast.warn("No products found");
    }
    await axios
      .get(`http://localhost:5000/products/search/${searchItem}`, { headers })
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => console.log(err));
  };

  

  const selectProduct = (e, title) => {
    setSearchResults([]); 
    setSearchItem(""); 
    navigate(`/singleProductPage/${title}`);
  };

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          height: "50px",
        }}
      >
        <div>
          <img
            src={logo}
            style={{ width: "90px", borderRadius: "10px" }}
            className="rounded-5 bg-white"
          />
        </div>
        <div
          className="flex-column sticky-top z-1 position-relative     justify-content-center align-items-center bg-white"
          style={{ backgroundColor: "white" }}
        >
          <div className="border border-dark rounded-lg sticky-top p-2 d-flex justify-content-center m-auto  ">
            <input
              type="text"
              placeholder="Search"
              className="border-0"
              size={60}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <IoSearch size={25} />
          </div>
          <div>
            <div className="w-100 bg-white position-absolute pl-1">
              {searchResults.length > 0 && searchItem
                ? searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={(e) => selectProduct(e, product.title)}
                      className="cursor-pointer d-flex align-items-center p-2 border-bottom"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="me-2"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                      <span>{product.title}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div
          className=" d-flex justify-content-between align-items-center"
          style={{ width: "15%" }}
        >
          <div onClick={() => navigate("/wishlistPage")}>
            <IoIosHeartEmpty size={30} />
          </div>
          <div onClick={() => navigate("/cartPage")}>
            <FaShoppingCart size={30} />
          </div>
          <div onClick={() => navigate("/userPage")}>
            {isLoggedIn ? (
              <FaUserCircle size={30} />
            ) : (
              <button className=" btn btn-dark fs-5">Login</button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
