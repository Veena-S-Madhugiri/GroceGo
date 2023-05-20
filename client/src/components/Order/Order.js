
import React, { useEffect, useState } from "react";
import "./Orders.css";
import Cookies from 'js-cookie';


const Order = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders)

  const usertoken = Cookies.get('token');


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

  const handleCancel = async (orderCancelId) => {

    const response = await fetch(`http://localhost:8000/api/orders/cancelOrders/${orderCancelId}`, {
      method: "PUT",
      headers: {
        'authentication-token': usertoken,
      },
    });
    const resData = await response.json();
    if (resData.success) {
      alert("Order Cancelled successfully!", "warning");
      fetchOrders();
    } else {
      console.log("Error");
    }
  }

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
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>

              <td>
                {order.products.map((product, index) => (
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

              </td>

              <td
                className={`payment-status ${order.payment.success
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
              <td> {order.shippingAddress.area ? order.shippingAddress.area : 'null'}, {order.shippingAddress.city ? order.shippingAddress.city : 'null'}, {order.shippingAddress.state ? order.shippingAddress.state : 'null'}, {order.shippingAddress.zipCode ? order.shippingAddress.zipCode : 'null'}</td>              <td>
                <button onClick={() => { handleCancel(order._id) }}
                  style={{
                    cursor:

                      order.status === "Cancelled"
                        ? "not-allowed"
                        : "pointer",
                    opacity:

                      order.status === "Cancelled"
                        ? 0.5
                        : 1,
                  }}
                > <img
                    src={require("../Order/cancel.png")}
                    alt="Logo"
                    className="Cancel"
                  /> </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Order;