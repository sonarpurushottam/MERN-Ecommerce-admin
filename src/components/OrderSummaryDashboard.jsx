
import { useOrders } from "../hooks/useOrders";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

// OrderSummaryDashboard Component
const OrderSummaryDashboard = () => {
  const { data: orders = [] } = useOrders();

  // Calculate total orders and total spent
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

  // Calculate status counts
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Calculate orders by date
  const ordersByDate = orders.reduce((acc, order) => {
    const date = dayjs(order.createdAt).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(ordersByDate);
  const orderCounts = Object.values(ordersByDate);

  // Calculate orders by hour
  const ordersByHour = orders.reduce((acc, order) => {
    const hour = dayjs(order.createdAt).hour();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourCounts = hours.map((hour) => ordersByHour[hour] || 0);

  // Calculate monthly summary
  const ordersByMonth = orders.reduce((acc, order) => {
    const month = dayjs(order.createdAt).format("YYYY-MM");
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const months = Object.keys(ordersByMonth);
  const monthlyOrderCounts = Object.values(ordersByMonth);
  const monthlyRevenue = months.map((month) => {
    return orders
      .filter((order) => dayjs(order.createdAt).format("YYYY-MM") === month)
      .reduce((acc, order) => acc + order.totalAmount, 0);
  });

  // Calculate top products
  const productCounts = orders
    .flatMap((order) => order.items)
    .reduce((acc, item) => {
      acc[item.productId.name] =
        (acc[item.productId.name] || 0) + item.quantity;
      return acc;
    }, {});

  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate payment method distribution
  const paymentMethodCounts = orders.reduce((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const paymentMethods = Object.keys(paymentMethodCounts);
  const paymentMethodSeries = Object.values(paymentMethodCounts);

  // Calculate unique customers and average spend
  const uniqueCustomers = new Set(orders.map((order) => order.userId.username))
    .size;
  const averageCustomerSpend =
    uniqueCustomers > 0 ? totalSpent / uniqueCustomers : 0;

  // Chart options
  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(statusCounts),
    colors: ["#FF4560", "#00E396", "#008FFB", "#FEB019", "#FF66C3"],
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  const orderByDateOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Orders by Date",
      align: "left",
    },
    xaxis: {
      categories: dates,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Orders",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  const ordersByHourOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Orders by Hour",
      align: "left",
    },
    xaxis: {
      categories: hours.map((hour) => `${hour}:00`),
      title: {
        text: "Hour of Day",
      },
    },
    yaxis: {
      title: {
        text: "Number of Orders",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  const monthlySummaryOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Monthly Order Summary",
      align: "left",
    },
    xaxis: {
      categories: months,
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Amount",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(2)}`,
      },
    },
  };

  const topProductsOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Top Products by Quantity Sold",
      align: "left",
    },
    xaxis: {
      categories: topProducts.map(([name]) => name),
      title: {
        text: "Product",
      },
    },
    yaxis: {
      title: {
        text: "Quantity Sold",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} units`,
      },
    },
  };

  const paymentMethodOptions = {
    ...chartOptions,
    labels: paymentMethods,
    title: {
      text: "Payment Method Distribution",
      align: "left",
    },
  };

  // New Chart Options for Additional Features
  const orderStatusOptions = {
    chart: {
      type: "pie",
    },
    labels: Object.keys(statusCounts),
    colors: ["#FF4560", "#00E396", "#008FFB", "#FEB019", "#FF66C3"],
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  const revenueBreakdownOptions = {
    chart: {
      type: "donut",
    },
    labels: Object.keys(statusCounts),
    colors: ["#FF4560", "#00E396", "#008FFB", "#FEB019", "#FF66C3"],
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toFixed(2)}`,
      },
    },
  };

  return (
    <motion.div
      className="p-4 bg-white shadow rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Order Summary Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4">{totalOrders}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Spent</Typography>
                <Typography variant="h4">₹{totalSpent.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Order Value</Typography>
                <Typography variant="h4">
                ₹{averageOrderValue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3
}>
<Card>
<CardContent>
<Typography variant="h6">Unique Customers</Typography>
<Typography variant="h4">{uniqueCustomers}</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Card>
<CardContent>
<Typography variant="h6">Average Spend per Customer</Typography>
<Typography variant="h4">₹{averageCustomerSpend.toFixed(2)}
</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Card>
<CardContent>
<Typography variant="h6">Orders by Date</Typography>
<ReactApexChart
options={orderByDateOptions}
series={[{ name: "Orders", data: orderCounts }]}
type="line"
width="100%"
/>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Card>
<CardContent>
<Typography variant="h6">Orders by Hour</Typography>
<ReactApexChart
options={ordersByHourOptions}
series={[{ name: "Orders", data: hourCounts }]}
type="bar"
width="100%"
/>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Card>
<CardContent>
<Typography variant="h6">Monthly Order Summary</Typography>
<ReactApexChart
options={monthlySummaryOptions}
series={[
{ name: "Orders", data: monthlyOrderCounts },
{ name: "Revenue", data: monthlyRevenue },
]}
type="line"
width="100%"
/>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Card>
<CardContent>
<Typography variant="h6">Top Products</Typography>
<ReactApexChart
options={topProductsOptions}
series={[
{
name: "Quantity Sold",
data: topProducts.map(([_, qty]) => qty),
},
]}
type="bar"
width="100%"
/>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Card>
<CardContent>
<Typography variant="h6">
Payment Method Distribution
</Typography>
<ReactApexChart
               options={paymentMethodOptions}
               series={paymentMethodSeries}
               type="pie"
               width="100%"
             />
</CardContent>
</Card>
</Grid>

php
Copy code
      {/* Additional Charts */}
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Order Status Distribution</Typography>
            <ReactApexChart
              options={orderStatusOptions}
              series={Object.values(statusCounts)}
              type="pie"
              width="100%"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Revenue Breakdown</Typography>
            <ReactApexChart
              options={revenueBreakdownOptions}
              series={monthlyRevenue}
              type="donut"
              width="100%"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
</motion.div>
);
};

export default OrderSummaryDashboard;