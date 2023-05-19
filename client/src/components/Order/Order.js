
import React, { useEffect, useState } from "react";
// import "./Order.css";
import Cookies from 'js-cookie';


const Order = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders)
  
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const usertoken = Cookies.get('token');
  
  
    const selectedOrder = orders.find((order) => order._id === selectedOrderId);
    console.log(selectedOrder)
  
    const handleViewMore = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
 
  
    const fetchOrders = async () => {
      try {
    
        const response = await fetch('http://localhost:8000/api/orders/getOrders', {
          method: "GET",
          headers: {
            'authentication-token': usertoken,
          },
        });
        const resultData = await response.json();
        // console.log(resultData);
        setOrders(resultData);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
   
      
  return (
    <div className="order-container">
      
      <h3 className="order-title">All Orders</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Shipping Address</th>
            {/* <th>View More</th> */}
            {/* <th>Updated At</th>
            <th>Shipping Address</th>
            <th>Cancel</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>

              <td>
                {order.products.slice(0, 2).map((product, index) => (
                  <div className="product-item" key={index}>
                    <img
                      src={product.photo}
                      width="50"
                      height="50"
                      alt={product.name}
                    />
                    <span className="product-name">{product.name}</span>
                  </div>
                ))}
                {order.products.length > 2 && <span>...</span>}
              </td>

              <td
                className={`payment-status ${
                  order.payment.success
                    ? ""
                    : order.status === "Cancelled"
                    ? "refunded"
                    : "not-paid"
                }`}
              >
                {order.payment.success
                  ? "Paid"
                  : order.status === "Cancelled"
                  ? "Refunded"
                  : "Not Paid"}
              </td>
              <td className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </td>

              <td className="order-date">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td> {order.shippingAddress.area}, {order.shippingAddress.city},{order.shippingAddress.state},{order.shippingAddress.zipCode},</td>

              {/* <td className="order-date">
                {
                  <button
                    className="btn btn-color-2"
                    onClick={() => {
                      handleViewMore();
                      setSelectedOrderId(order._id);
                    }}
                  >
                    View More
                  </button>
                }
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Details</h2>
            <div></div>
            <img
              src={require("../../assets/cancel.png")}
              alt="Cart"
              className="cancelOrder"
              style={{
                cursor:
                  selectedOrder.status === "Delivered" ||
                  selectedOrder.status === "Cancelled"
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  selectedOrder.status === "Delivered" ||
                  selectedOrder.status === "Cancelled"
                    ? 0.5
                    : 1,
              }}
              onClick={() =>
                selectedOrder.status !== "Delivered" &&
                handleOrderCancel(selectedOrder._id)
              }
            />
               <img
              src={require("../../assets/download.png")}
              alt="Cart"
              className="invoiceDownload"
              style={{
                cursor:
                  
                  selectedOrder.status === "Cancelled"
                    ? "not-allowed"
                    : "pointer",
                opacity:
                 
                  selectedOrder.status === "Cancelled"
                    ? 0.5
                    : 1,
              }}
              onClick={() =>
                selectedOrder.status !== "Cancelled" &&
                handleInvoiceDownload(selectedOrder._id)
              }
            />

            <div className="order-info">
              <p className="order-info-buyer">
                Buyer: {selectedOrder.buyer.firstName}
              </p>
              <p className="order-info-products">Products:</p>
              <ul className="order-info-product-list">
  {selectedOrder.products.map((product) => (
    <li key={product._id}>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}/-</p>
      <ul style={{listStyle:'none'}}>
        {selectedOrder.product.map((productQty) => (
          productQty.productId === product._id && (
            <li key={productQty.productId} >
              <p>Quantity: {productQty.qty}</p>
            </li>
          )
        ))}
      </ul>
    </li>
  ))}
</ul>

              <p className="order-info-shipping-address">Shipping Address:</p>
              <ul className="order-info-address">
                <li>
                  {selectedOrder.shippingAddress ? (
                    <>
                      <p>Street: {selectedOrder.shippingAddress.street}</p>
                      <p>City: {selectedOrder.shippingAddress.city}</p>
                      <p>State: {selectedOrder.shippingAddress.state}</p>
                      <p>Country: {selectedOrder.shippingAddress.country}</p>
                      <p>ZipCode: {selectedOrder.shippingAddress.zipCode}</p>
                    </>
                  ) : (
                    <>
                      <p>Street: null</p>
                      <p>City: null</p>
                      <p>State: null</p>
                      <p>Country: null</p>
                      <p>ZipCode: null</p>
                    </>
                  )}
                </li>
              </ul>
              <p className="order-info-status">
                Status: {selectedOrder.status}
              </p>
              <p className="order-info-created-at">
                Created At: {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <p className="order-info-updated-at">
                Updated At: {new Date(selectedOrder.updatedAt).toLocaleString()}
              </p>
            </div>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Order;