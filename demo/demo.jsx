import React from 'react';
import { useOrder } from '../hooks/useOrder';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Order = () => {
  const { getOrders, deleteOrder, updateOrderStatus } = useOrder();
  const { data: orders, isLoading } = getOrders();
  const { mutate: deleteOrderMutation } = deleteOrder();
  const { mutate: updateOrderStatusMutation } = updateOrderStatus();

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            className="bg-white p-4 shadow rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <p className="text-lg font-semibold">Order ID: {order._id}</p>
              <p className="text-sm">User: {order.userId.name}</p>
              <p className="text-sm">Total Amount: ${order.totalAmount}</p>
              <p className="text-sm">Status: {order.status}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => updateOrderStatusMutation({ orderId: order._id, status: 'Shipped' })}
                className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded mr-2"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => deleteOrderMutation(order._id)}
                className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
              >
                Delete Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Order;
