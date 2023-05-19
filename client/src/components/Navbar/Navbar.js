// import React from 'react';
import './navbar.css';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Home() {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);



  function handleLogout() {
    Cookies.remove('token');
    localStorage.removeItem('cart')
    localStorage.removeItem('selectedAddress')
    window.location.href = "/";
  }

  return (

    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-container">
            <img src={require('./logo-png.png')} alt="GroceGO Logo" className='logo-icon' />
          </div>


          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/home"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    {/* Home */}
                    <img
                      src={require("../Navbar/Home.png")}
                      alt="Logo"
                      className="HomeIcon"
                    />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    style={{ marginRight: "300px" }}
                    exact
                    to="/products"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Shop
                  </NavLink>
                </li>


                <li className="nav-item">
  <div className="dropdown">
    <img
      src={require("../Navbar/login.png")}
      alt="Logo"
      className="Person"
      onClick={() => setShowDropdown(!showDropdown)}
    />
    {showDropdown && (
      <div className="dropdown-content">
        <NavLink
          exact
          to="/Order"
          activeClassName="active"
          className="nav-links"
          onClick={() => setShowDropdown(false)}
        >
          My Orders
        </NavLink>
        <div className="dropdown-divider"></div> {/* Optional: Add a visual divider */}
        <NavLink
          exact
          to="/Profile"
          activeClassName="active"
          className="nav-links"
          onClick={() => setShowDropdown(false)}
        >
          My Profile
        </NavLink>
      </div>
    )}
  </div>
</li>

                <li className="nav-item">
                  <NavLink
                    exact
                    to="/cart"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >

                    <img
                      src={require("../Navbar/Cart.png")}
                      alt="Logo"
                      className="Person"
                    />
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>


              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/contactus"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    SignIn
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signup"
                    activeClassName="active"
                    className="nav-links signupbtn"
                    onClick={() => setClick(false)}
                  >
                    SignUp
                  </NavLink>



                </li>
                <li className="nav-item">
                  {<NavLink
                    exact
                    to="/Cart"
                    activeClassName="active"
                    className="nav-links"
                    onClick={() => setClick(false)}
                  >
                    {/* Cart */}
                    <img
                      src={require("../Navbar/Home Icon.png")}
                      alt="Logo"
                      className="HomeIcon"
                    />
                  </NavLink>}
                </li>

              </>
            )}
          </ul>
          <div className="nav-icon" onClick={() => setClick(!click)}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>


    </>
  );
}

export default Home;
