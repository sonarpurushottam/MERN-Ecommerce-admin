// import { useOrder } from "../hooks/useOrders";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const { getOrderById } = useOrder();
//   const { data: order, isLoading, error } = getOrderById(id);

//   if (isLoading) return <div>Loading order details...</div>;
//   if (error) return <div>Error loading order details: {error.message}</div>;

//   if (!order) return <div>Order not found.</div>;

//   return (
//     <motion.div
//       className="p-4 bg-white shadow rounded-lg"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="text-2xl font-bold mb-4">Order Details</h1>
//       <p>
//         <strong>Order ID:</strong> {order._id || "N/A"}
//       </p>
//       <p>
//         <strong>User:</strong>{" "}
//         {order.userId ? order.userId.username : "Unknown"}
//       </p>
//       <p>
//         <strong>Total Amount:</strong> $
//         {order.totalAmount != null ? order.totalAmount.toFixed(2) : "N/A"}
//       </p>
//       <p>
//         <strong>Status:</strong> {order.status || "N/A"}
//       </p>
//       <p>
//         <strong>Items:</strong>
//       </p>
//       <ul>
//         {order.items && order.items.length > 0 ? (
//           order.items.map((item, index) => (
//             <li key={index} className="mb-4 flex items-center space-x-4">
//               {item.productId ? (
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.productId.productImage[0]} // Assuming the first image is the main one
//                     alt={item.productId.name || "Product Image"}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <p>
//                       <strong>Product:</strong>{" "}
//                       {item.productId.name || "Product"}
//                     </p>
//                     <p>
//                       <strong>Quantity:</strong> {item.quantity}
//                     </p>
//                     <p>
//                       <strong>Price:</strong> $
//                       {item.productId.price != null
//                         ? item.productId.price.toFixed(2)
//                         : "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <span>Product details unavailable</span>
//               )}
//             </li>
//           ))
//         ) : (
//           <p>No items found in this order.</p>
//         )}
//       </ul>
//       <p>
//         <strong>Shipping Address:</strong> {order.shippingAddress || "N/A"}
//       </p>
//       <p>
//         <strong>Billing Address:</strong> {order.billingAddress || "N/A"}
//       </p>
//       <p>
//         <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
//       </p>
//       <p>
//         <strong>Tracking Information:</strong> {order.trackingInfo || "N/A"}
//       </p>
//     </motion.div>
//   );
// };

// export default OrderDetails;
