import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-blue-600 mb-6"
        >
          <FaUserShield size={48} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Welcome, Admin!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-600 mb-6"
        >
          Manage your dashboard, analyze data, and control all operations
          seamlessly.
        </motion.p>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-4"
        >
          <a
            href="/admin/users"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Manage Users
          </a>
          <a
            href="/admin/products"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Manage Products
          </a>
          <a
            href="/admin/orders"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Manage Orders
          </a>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
