import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Footer = () => {
  const [email,setEmail]=useState();
  const handleClick=(e)=>{
    e.preventDefault();
    if(email==="" ||email===undefined){
      return toast.warn("Provide your email")
    }
      return toast.success("Subscribed")


  }
  return (
    <footer className="mt-5 border border-dark pt-3">
      <div className="container py-8">
        <div className="row">
          <div className="col-12 col-md-3">
            <h3 >Shop</h3>
            <ul className="mt-4 list-unstyled">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Sale</li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h3 >Support</h3>
            <ul className="mt-4 list-unstyled">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping</li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h3 >Company</h3>
            <ul className="mt-4 list-unstyled">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h3 >Newsletter</h3>
            <p className="mt-4 text-base text-gray-500">Subscribe to get special offers, free giveaways, and updates.</p>
            <form className="mt-4">
              <div className="d-flex">
                <input
                  type="email"
                  className="flex-1 min-w-0 p-2 text-base border border-gray-300 rounded-l-lg focus:outline-none"
                  placeholder="Enter your email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-dark px-4 py-2 font-medium rounded-r-lg"
                  onClick={(e)=>handleClick(e)}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
      <div className=" mt-3 shadow-lg p-3 bg-white rounded">
          <p className="text-base text-gray-400 text-center">&copy; 2025 Fashion Store. All rights reserved.</p>
        </div>
        <ToastContainer/>
    </footer>
  );
};

export default Footer;

