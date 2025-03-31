import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  console.log(formDetails);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/users/login", formDetails)
      .then((res) => {
        localStorage.setItem("Authorization",res.data.token)
        console.log(res)})
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 m-auto border border-dark p-5 mt-5 rounded">
      <h2>Welcome Back</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"} 
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              onClick={togglePasswordVisibility} 
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            </span>
          </div>
        </div>

        <input type="submit" class="btn btn-dark" />
      </form>
      <div className="text-center">
        <p>Don't have an account ?</p>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
