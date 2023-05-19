import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
    // terms: false,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // form submission logic here
    const response = await fetch("http://localhost:8000/api/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber:data.phoneNumber
      }),
    });

    const resData = await response.json();
    console.log(resData);

    if (resData.success) {
      alert("Welcome aboard! You're now a member");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setData((prevState) => ({ ...prevState, password }));
    if (data.confirmPassword !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setData((prevState) => ({ ...prevState, confirmPassword }));
    if (data.password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleTermsChange = (event) => {
    setData({ ...data, terms: event.target.checked });
    setError("");
  };

  return (
    <div className="signup-container">
    
    <div className="signup-form">
     
        <h2>Sign Up</h2>
     

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="name-inputs" style={{display: 'flex'}}>
            <div style={{flex: 1}}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleInputChange}
                value={data.firstName}
              />
            </div>
            <div style={{flex: 1, marginLeft: 10}}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleInputChange}
                value={data.lastName}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email address"
            onChange={handleInputChange}
            value={data.email}
          />
         </div>
         <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phoneNumber"
            
            placeholder="Enter your Phone number"
            onChange={handleInputChange}
            value={data.phoneNumber}
          />
         </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            value={data.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleConfirmPasswordChange}
            value={data.confirmPassword}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
                <p className="account">
          Already have an account? <Link to="/login">Sign In </Link>
        </p>

      </form>
    </div>
    </div>
  );
};

export default SignUp;




