import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import ReactPaginate from "react-paginate";
import "./Dashboard.css";
import { loginContext } from "../contexts/AuthContext";
const Dashboard = () => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    getProducts(); 
  }, []);

  const getProducts = async () => {
    const headers = { Authorization: token };
    await axios
      .get("http://localhost:5000/products/getProducts", { headers })
      .then((res) => {
        setSortedProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getProductsByPriceOrRating = async (feature, type) => {
    const headers = { Authorization: token };
    await axios
      .get(`http://localhost:5000/products/sortBy${type}/${feature}`, {
        headers,
      })
      .then((res) => {
        setSortedProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category); 
    const headers = { Authorization: token };
    await axios
      .get(
        `http://localhost:5000/products/getCategoryProducts?category=${category}`,
        { headers }
      )
      .then((res) => {
        setSortedProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );



  

  return (
    <div>
      <div className="d-flex gap-3">
        <div className="w-25" style={{ border: "1px solid" }}>
          <div className="p-3">
            <h2>Categories</h2>
            <form>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="shoes"
                  id="shoes"
                  name="category" 
                  checked={selectedCategory === "shoes"} 
                  onChange={() => handleCategoryChange("shoes")}
                />
                <label className="form-check-label" htmlFor="shoes">
                  Shoes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="shirts"
                  id="shirts"
                  name="category"
                  checked={selectedCategory === "shirts"}
                  onChange={() => handleCategoryChange("shirts")}
                />
                <label className="form-check-label" htmlFor="shirts">
                  Shirts
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="watches"
                  id="watches"
                  name="category"
                  checked={selectedCategory === "watches"}
                  onChange={() => handleCategoryChange("watches")} 
                />
                <label className="form-check-label" htmlFor="watches">
                  Watches
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="electronics"
                  id="electronics"
                  name="category" 
                  checked={selectedCategory === "electronics"} 
                  onChange={() => handleCategoryChange("electronics")}
                />
                <label className="form-check-label" htmlFor="electronics">
                  Electronics
                </label>
              </div>
            </form>

           
          </div>
        </div>

        <div className="w-75 row" style={{ border: "1px solid" }}>
          <div className="dropdown p-2">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort By
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() =>
                    getProductsByPriceOrRating("low-to-high", "Price")
                  }
                >
                  Price: Low to High
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() =>
                    getProductsByPriceOrRating("high-to-low", "Price")
                  }
                >
                  Price: High to Low
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() =>
                    getProductsByPriceOrRating("low-to-high", "Rating")
                  }
                >
                  Rating: Low to High
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() =>
                    getProductsByPriceOrRating("high-to-low", "Rating")
                  }
                >
                  Rating: High to Low
                </a>
              </li>
            </ul>
          </div>

          <div className="row">
            {currentProducts.map((product) => (
              <div className="col-4" key={product.id}>
                <Card props={product} showQuantity={false}/>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(sortedProducts.length / productsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            activeClassName={"page-item active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link btn btn-dark"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link btn btn-dark"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link btn btn-dark"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

