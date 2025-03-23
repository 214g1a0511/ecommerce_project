import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"
const Card = ({ props }) => {
    // console.log(props);
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
            <h5>₹ {props.price}</h5>
            <h6>★ {props.rating}</h6>
            <button className="btn btn-dark">Add To Cart</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  

