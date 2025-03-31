import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    cPassword: "",
  });
  
  console.log(confirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
  console.log(formDetails);

  const registerDetails = async (e) => {
    e.preventDefault();
    if (confirmPassword === formDetails.password) {
      console.log(formDetails);
      await axios
        .post("http://localhost:5000/users/register", formDetails)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    else{
      console.log("password does not match!!")
    }
  };

  return (
    <div className="w-50 m-auto border border-dark p-5 mt-5 rounded">
      <form onSubmit={(e) => registerDetails(e)} className="p-2">
        <h2>Create an Account</h2>
        <div class="mb-3">
          <label for="exampleInputUserName" class="form-label">
            Username
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputUserName"
            name="username"
            onChange={(e) => handleChange(e)}
            value={formDetails.username}
          />
        </div>
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
            value={formDetails.email}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={(e) => handleChange(e)}
            value={formDetails.password}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            name="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <input type="submit" class="btn btn-dark mx-auto" />

      </form>
      <div className="text-center">
      <p>Already have Account ?</p>
      <Link to="/login" className="text-center">Sign in</Link>
      </div>
    </div>
  );
};

export default Register;
