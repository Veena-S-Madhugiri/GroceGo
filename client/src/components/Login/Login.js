import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    // e.preventDefault();
    // Handle login logic here
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login_user", {

        email,
        password,

      });
      const resData = response.data;
      const userToken = resData.token;

      document.cookie = `token=${userToken}; path=/; expires=${new Date(Date.now() + 3600 * 1000).toUTCString()};`;

      window.location.href = "/home";
    }
    catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="login-container">
      <div className="login-form">




        <h1 className="login-heading">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              className="input-field"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="login-btn" type="submit">
            Sign In
          </button>

          <p className="account">
            Not a member? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

