
import { useOrder } from "../hooks/useOrder";
import { motion } from "framer-motion";

const OrderSummaryDashboard = () => {
  const { getOrders } = useOrder();
  const { data: orders } = getOrders();

  const totalOrders = orders?.length || 0;
  const totalSpent = orders?.reduce((acc, order) => acc + order.totalAmount, 0) || 0;

  return (
    <motion.div
      className="p-4 bg-white shadow rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">Order Summary Dashboard</h1>
      <p className="text-lg"><strong>Total Orders:</strong> {totalOrders}</p>
      <p className="text-lg"><strong>Total Spent:</strong> ${totalSpent.toFixed(2)}</p>
      {/* Add more statistics and charts as needed */}
    </motion.div>
  );
};

export default OrderSummaryDashboard;
