import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import logo from "../assets/create logo regardig shopping mart.jpg";
// import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

import { IoIosHeartEmpty } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { loginContext } from "../contexts/AuthContext";
import axios from "axios";
import Select from "react-select";
import { toast,ToastContainer } from "react-toastify";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, loginToken } = useContext(loginContext);
  // console.log(loginToken)
  // console.group(isLoggedIn)
  const token = localStorage.getItem("Authorization");
  const [searchItem, setSearchItem] = useState();
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchItem)

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(searchItem);
    }, 2000);
    return () => clearInterval(timer);
  }, [searchItem]);

  const searchProducts = async (searchItem) => {
    console.log("in function call", searchItem);
    const headers = { Authorization: token };
    // console.log(headers)
    if(searchItem=="undefined"){
      return toast.warn("No products found")
    }
    await axios
      .get(`http://localhost:5000/products/search/${searchItem}`, { headers })
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(searchResults);

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
        <div className="flex-column sticky-top z-1 position-relative     justify-content-center align-items-center " style={{backgroundColor:"white"}}>
          <div className="border border-dark rounded-lg sticky-top p-2 d-flex justify-content-center m-auto  " style={{backgroundColor:"white"}}>
            <input
              type="text"
              placeholder="Search"
              className="border-0"
              size={60}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <IoSearch size={25} />
          </div>
          <div className="h-100 overflow-auto pl-1">
            {searchResults &&
              searchResults.map((product) => <p>{product.title}</p>)}
          </div>
        </div>

        <div
          className=" d-flex justify-content-between align-items-center"
          style={{ width: "15%" }}
        >
          <div>
            <IoIosHeartEmpty size={30} />
          </div>
          <div>
            <FaShoppingCart size={30} />
          </div>
          <p>{isLoggedIn}</p>
          <div>
            {isLoggedIn ? (
              <FaUserCircle size={30} />
            ) : (
              <button className=" btn btn-dark fs-5">Login</button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Navbar;
