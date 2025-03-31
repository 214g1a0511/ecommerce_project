import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { name } = useParams();
  const decoded_name = decodeURIComponent(name);
  const token = localStorage.getItem("Authorization");
  const [singleProduct, setSingleProduct] = useState();

  useEffect(() => {
    getSingleProduct();
  }, [decoded_name]);

  const getSingleProduct = async () => {
    const headers = { Authorization: token };

    await axios
      .get(`http://localhost:5000/products/singleItem/${decoded_name}`, {
        headers,
      })
      .then((res) => {
        setSingleProduct({...res.data});
      })
      .catch((err) => console.log(err));
  };
  console.log(singleProduct);

  const navigateToCart = async () => {
    const headers = { Authorization: token };
    await axios
      .post(
        "http://localhost:5000/cart/add",
        {
          title: singleProduct[0].title,
          price: singleProduct[0].price,
          image: singleProduct[0].image,
          quantity: 4,
        },
        { headers }
      )
      .then((res) => {
        console.log("added")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container col-md-6 mt-5">
      <div className="row align-items-center border rounded shadow p-4">
        <div className="col-md-4 text-center">
          <img src={ singleProduct&& singleProduct[0].image} alt={ singleProduct&& singleProduct[0].name} className="img-fluid rounded" />
        </div>

        <div className="col-md-4">
          <h1 className="fw-bold">{ singleProduct&& singleProduct[0].title}</h1>
          <h5 className="fw-bold">₹{ singleProduct&& singleProduct[0].price}</h5>

          <h5 className="fw-bold">★{ singleProduct&& singleProduct[0].rating}</h5>
          <button className="btn btn-dark" onClick={navigateToCart}>Add To Cart</button>



        </div>
      </div>
    </div>
  )
};

export default SingleProduct;
