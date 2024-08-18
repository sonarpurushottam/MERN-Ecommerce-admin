import { useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    getOrders,
    getOrdersByUserEmailOrName,
    deleteOrder,
    updateOrderStatus,
  } = useOrder();

  const { data: orders, isLoading, error } = searchTerm
    ? getOrdersByUserEmailOrName(searchTerm)
    : getOrders({ page, limit, startDate, endDate });

  const deleteOrderMutation = deleteOrder();
  const updateOrderStatusMutation = updateOrderStatus();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatusMutation.mutate({ orderId, status: newStatus });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilter = () => {
    // Trigger refetch or update data based on date range
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders.</div>;

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
        <div className="mt-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded ml-2"
          />
          <button
            onClick={handleFilter}
            className="p-2 bg-blue-500 text-white rounded ml-2"
          >
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-white p-4 shadow rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="text-lg font-semibold">Order ID: {order._id}</p>
                <p className="text-sm">
                  User: {order.userId ? order.userId.username : "Unknown"}
                </p>
                <p className="text-sm">Total Amount: ${order.totalAmount}</p>
                <p className="text-sm">Status: {order.status}</p>
                <Link
                  to={`/orders/${order._id}`}
                  className="text-blue-500 underline"
                >
                  View Details
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
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
                    disabled={order.status === status}
                  >
                    {status}
                  </button>
                ))}
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

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
