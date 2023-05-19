import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import cookies from 'js-cookie';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems)
  const [cartTotal, setCartTotal] = useState(0);
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: null, type: null });
  const [addressList, setAddressList] = useState({});
  console.log(addressList)

  const token = cookies.get("token");

  useEffect(() => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    setCartItems(cart);

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setCartTotal(total);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/braintree/token')
      .then(response => response.text())
      .then(token => setClientToken(token))
      .catch(error => console.error(error));
  }, []);

  const handleRemoveItem = (itemId) => {
    const newCartItems = cartItems.filter((item) => item._id !== itemId);
    const total = newCartItems.reduce((acc, item) => acc + item.price, 0);
    setCartItems(newCartItems);
    setCartTotal(total);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const fetchAddressData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/address/getAddress', {
        headers: { 'authentication-token': token },
      });
      const result = await response.json();
      console.log(result);
      setAddressList(result)
      // setSuccess(true)
    } catch (error) {
      console.log('error in response');
    }
  };

  useEffect(() => {

    fetchAddressData();
  }, [token]);
  const totalPrice = cartTotal.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const selectedAddress = localStorage.getItem("selectedAddress");
      const { nonce } = await instance.requestPaymentMethod();
      const response = await fetch("http://localhost:8000/api/brainTree/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authentication-token": token,
        },
        body: JSON.stringify({
          nonce,
          cart: cartItems,
          selectedAddress
        }),
      });

      const { ok } = await response.json();
      setLoading(false);
      setAlert({ message: "Order confirmed! Payment successful! Keep shopping!", type: "Success" });
      setTimeout(() => {
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedAddress')
        setCartItems([]);
        window.location.href = "/order";
      }, 4000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert({ message: "Payment failed. Please try again.", type: "error" });
    }
  };

  return (
    <div className="cartcontainer">
      <div className="row">
        <div className="col-md-7">
        <div className="cart-container">
  
  
        {cartItems.length === 0 ? (
    <h3>Your cart is empty. Add items to your cart</h3>
  ) : (
    <>
  <h1>Shopping Cart</h1>

    <div className="cart-items">
      {cartItems.map((item) => (
        <div className="cart-item" key={item._id}>
          <img src={item.photo} alt={item.name} />
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <button onClick={() => handleRemoveItem(item._id) }>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  )}
  {/* <button className="btn btn-primary checkout-button">Checkout</button> */}
</div>
        </div>
        <div className="col-md-5">
          <div className="order-summary-container">
            <div className="card p-3">
              <h5 className="text-center">Order Summary</h5>
              <div className="order-summary">
                <div className="d-flex justify-content-between mt-3">
                  <h6>Subtotal:</h6>
                  <h6>{totalPrice}</h6>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <h6>Delivery Charges:</h6>
                  <h6 style={{ color: "#28a745" }}>FREE</h6>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <h6>Total:</h6>
                  <h6>{totalPrice}</h6>
                </div>
                <div className="mb-3 addressCartContainer">
              <h5>Select an address:</h5>
              {addressList && addressList.length > 0 ? (
                <select
                  name="address"
                  onChange={(e) =>
                    localStorage.setItem("selectedAddress", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select an address
                  </option>
                  {Array.isArray(addressList) &&
                  addressList.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.street}, {address.area},{address.city}, {address.state}{" "}
                      {address.zipCode}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <p>No addresses found. </p>
                  <p>
                    Please{" "}
                    <a href="/profile" className="link">
                      add an address
                    </a>{" "}
                    before continuing.
                  </p>
                </>
              )}
            </div>
                {!clientToken || !cartItems?.length ? (
                  ""
                ) : (

                  
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={!instance}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
                <div className="checkout-alert">
                  {alert.message && <p className={`alert ${alert.type}`}>{alert.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;