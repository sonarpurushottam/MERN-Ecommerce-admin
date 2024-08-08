import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminSideOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        setOrders(data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      toast.success("Order status updated");
      // Refetch orders to update the list
      const { data } = await axios.get("http://localhost:5000/api/orders");
      setOrders(data);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        toast.success("Order deleted");
        // Refetch orders to update the list
        const { data } = await axios.get("http://localhost:5000/api/orders");
        setOrders(data);
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  const handleCreateOrder = () => {
    navigate("/payment");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <button
        onClick={handleCreateOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create Order
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Order ID</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Total Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order._id}</td>
              <td className="p-2">{order.userId.name}</td>
              <td className="p-2">${order.totalAmount}</td>
              <td className="p-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateStatus(order._id, e.target.value)
                  }
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSideOrderPage;
