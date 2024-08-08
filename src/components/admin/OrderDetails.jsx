import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the route parameters
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token from local storage

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(data);
      } catch (error) {
        toast.error("Failed to fetch order details");
      }
    };

    fetchOrder();
  }, [id, token]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Details</h1>
      <table>
        <tbody>
          <tr>
            <td>Order ID: {order._id}</td>
          </tr>
          <tr>
            <td>Name: {order.name}</td>
          </tr>
          <tr>
            <td>Product Image: <img src={order.productImage} alt={order.name} /></td>
          </tr>
          <tr>
            <td>Quantity: {order.quantity}</td>
          </tr>
          <tr>
            <td>Price: {order.price}</td>
          </tr>
          {/* Add more rows for other properties */}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
