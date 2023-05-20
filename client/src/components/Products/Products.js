import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './products.css';

const Navbar = () => {
  // This is a separate component that renders the navbar
};

const Product = () => {
  // State variables to store the fetched data, selected product type, cart items, and message for cart addition success
  const [userData, setUserData] = useState([]);
  const [type, setType] = useState('');
  const [cart, setCart] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  
  
  
  // State variable to store the search query entered by the user
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get the token stored in a cookie
  const token = Cookies.get('token');

  // Use the useEffect hook to fetch the data from the API endpoint when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchData();
  }, []);

  // Event handler to filter products by type
  const handleFilterClick = (event) => {
    setType(event.target.value);
  };

  // Filter the products based on the selected product type
  const filteredProducts = type
    ? userData.filter((data) => data.category === type)
    : userData;

  // Event handler to add a product to the cart
  const handleCart = (event, product) => {
    event.preventDefault(); // prevent default form submission behavior

    // If the user is not logged in, show a message and redirect to the login page after 3 seconds
    if (!token) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        window.location.href = '/login';
      }, 3000);
    } else {
      // If the user is logged in, show a message and add the product to the cart
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1000);

      // Get existing cart from local storage
      const cartJson = localStorage.getItem('cart');
      const cart = cartJson ? JSON.parse(cartJson) : [];

      // Append new product to cart
      const newCart = [...cart, product];

      // Convert cart array to JSON string
      const newCartJson = JSON.stringify(newCart);

      // Set new cart JSON string to local storage
      localStorage.setItem('cart', newCartJson);

      // Update state with new cart
      setCart(newCart);
      console.log(cart);
    }
  };

  // Event handler to filter products by search query
  const handleSearch = () => {
    const filteredProducts = userData.filter(
      (data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredProducts;
  };

  return (
    <div className='product'>
      <Navbar />
      {/* <h1 style={{textAlign:"center"}}>"Fueling your pantry, feeding your soul."</h1> */}
      <div className='NAVPRODUCTS'>
        <button value='Fruits' onClick={handleFilterClick}>
          Fruits
        </button>
        <button value='Vegetables' onClick={handleFilterClick}>
          Vegetables
        </button>
        <button value='Dairy' onClick={handleFilterClick}>
          Dairy
        </button>
        <button value='Grocery' onClick={handleFilterClick}>
          Grocery
        </button>
        <button value='MeatAndSeafood' onClick={handleFilterClick}>
          Meat &amp; Seafood
        </button>

        {/* <input
          type='text'
          placeholder=' Search products '
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button> */}
      </div>
      <div className='shopping-cards'>
        {filteredProducts.map((data, index) => (
          <form className='productform' key={index}>
            <img src={data.photo} alt={data.photo} className='ShopImage'></img>
            <div className='ShopDetails'>
              <p className='name'> {data.name}</p>
              <p className='price'>Price: {data.price} /- </p>
              <p className='quantity'>Qty: {data.quantity}</p>
            </div>
            <b className='Shopbutton'>{data.description}</b>
            <button onClick={(event) => handleCart(event, data)}>ADD TO CART</button>
          </form>
        ))}
      </div>
      {showMessage && <div className='alert'>Product added to cart successfully</div>}
    </div>
  );
};

export default Product;