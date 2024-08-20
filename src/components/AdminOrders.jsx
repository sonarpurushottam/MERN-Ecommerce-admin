import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useOrders,
  useUpdateOrderStatus,
  useDeleteOrder,
} from "../hooks/useOrders";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const AdminOrders = () => {
  const [filters, setFilters] = useState({ sort: "desc", status: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const { data: orders, isLoading, isError } = useOrders(filters);
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus.mutate(
      { orderId, status },
      {
        onSuccess: () => {
          toast.success("Order status updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update order status.");
        },
      }
    );
  };

  const handleDeleteOrder = (orderId) => {
    toast((t) => (
      <div>
        <span>Are you sure you want to delete this order?</span>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteOrder.mutate(orderId, {
              onSuccess: () => {
                toast.dismiss(t.id);
                toast.success("Order deleted successfully!");
              },
              onError: () => {
                toast.dismiss(t.id);
                toast.error("Failed to delete order.");
              },
            });
          }}
          style={{ marginLeft: "8px" }}
        >
          Confirm
        </Button>
        <Button
          variant="outlined"
          onClick={() => toast.dismiss(t.id)}
          style={{ marginLeft: "8px" }}
        >
          Cancel
        </Button>
      </div>
    ));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredOrders =
    orders?.filter((order) =>
      order.userId.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading orders.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Orders
      </Typography>

      <TextField
        label="Search by User"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        displayEmpty
        fullWidth
        margin="normal"
      >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Processing">Processing</MenuItem>
        <MenuItem value="Shipped">Shipped</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </Select>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.userId.username}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDetails(order)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteOrder(order._id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Modal */}
      <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <Typography variant="h6">Order ID: {selectedOrder._id}</Typography>
              <Typography>User: {selectedOrder.userId.username}</Typography>
              <Typography>Status: {selectedOrder.status}</Typography>
              <Typography>Total Amount: ₹{selectedOrder.totalAmount.toFixed(2)}</Typography>
              <Typography>Shipping Address: {selectedOrder.shippingAddress}</Typography>
              <Typography>Billing Address: {selectedOrder.billingAddress}</Typography>
              <Typography>Payment Method: {selectedOrder.paymentMethod}</Typography>
              <Typography>Tracking Information: {selectedOrder.trackingInfo}</Typography>
              <Typography variant="h6">Items:</Typography>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <ul>
                  {selectedOrder.items.map((item, index) => (
                    <li key={index}>
                      <Typography>Product: {item.productId.name}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Price: ₹{item.productId.price.toFixed(2)}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No items found.</Typography>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Toaster />
    </Container>
  );
};

export default AdminOrders;
