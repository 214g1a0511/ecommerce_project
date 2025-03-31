import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
const Wishlist = () => {
  const token = localStorage.getItem("Authorization");

  const location = useLocation();
  const product = location.state;
  const [wishlistProducts, setWishlistProducts] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const headers = { Authorization: token };
    await axios
      .get("http://localhost:5000/wishlist/getItems", { headers })
      .then((res) => {
        setWishlistProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete=async(id)=>{
    const headers={Authorization:token}
    await axios.delete(`http://localhost:5000/wishlist/delete/${id}`,{headers});
    setWishlistProducts((prevItems) => prevItems.filter(item => item.id !== id));
    setTimeout(()=>{
      getData()
    },500);
  }

  return (
    <div className="row">
      {wishlistProducts?.map((product) => (
        <div className="col-4" key={product.id}>
          <Card props={product} showQuantity={false} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
