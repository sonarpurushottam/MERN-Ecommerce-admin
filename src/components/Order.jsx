import React, { useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    getOrders,
    getOrdersByUserEmailOrName,
    deleteOrder,
    updateOrderStatus,
  } = useOrder();

  // Fetch orders based on search term
  const { data: orders, isLoading } = searchTerm
    ? getOrdersByUserEmailOrName(searchTerm)
    : getOrders();

  const deleteOrderMutation = deleteOrder();
  const updateOrderStatusMutation = updateOrderStatus();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatusMutation.mutate({ orderId, status: newStatus });
  };

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email or username..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-white p-4 shadow rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <p className="text-lg font-semibold">Order ID: {order._id}</p>
                <p className="text-sm">
                  User: {order.userId ? order.userId.username : "Unknown"}
                </p>
                <p className="text-sm">Total Amount: ${order.totalAmount}</p>
                <p className="text-sm">Status: {order.status}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  {[
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(order._id, status)}
                      className={`py-2 px-4 rounded ${
                        order.status === status
                          ? "bg-gray-500 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      disabled={order.status === status} // Disable if the status is already set
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => deleteOrderMutation.mutate(order._id)}
                  className="mt-2 text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
                >
                  Delete Order
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
