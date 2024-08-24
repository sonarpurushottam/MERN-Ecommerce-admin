import { useOrders } from "../hooks/useOrders";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

const OrderSummaryDashboard = () => {
  const { data: orders = [] } = useOrders();
  // Calculate total orders and total spent
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);

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
  // Chart options
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

  const orderStatusDistribution = {
    chart: {
      type: "donut",
    },
    title: {
      text: "Order Status Distribution",
      align: "left",
    },
    labels: Object.keys(statusCounts),
    colors: ['#00E396', '#008FFB', '#FEB019', '#FF4560'],
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
        formatter: (val) => `${val.toFixed(2)}`,
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
        </Grid>

        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12} md={6}>
            <ReactApexChart
              options={orderByDateOptions}
              series={[{ name: "Orders", data: orderCounts }]}
              type="line"
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReactApexChart
              options={ordersByHourOptions}
              series={[{ name: "Orders", data: hourCounts }]}
              type="bar"
              height={350}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12} md={6}>
            <ReactApexChart
              options={monthlySummaryOptions}
              series={[
                { name: "Orders", data: monthlyOrderCounts },
                { name: "Revenue", data: monthlyRevenue },
              ]}
              type="line"
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReactApexChart
              options={topProductsOptions}
              series={[
                {
                  name: "Quantity Sold",
                  data: topProducts.map(([, count]) => count),
                },
              ]}
              type="bar"
              height={350}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12} md={6}>
            <ReactApexChart
              options={orderStatusDistribution}
              series={Object.values(statusCounts)}
              type="donut"
              height={350}
            />
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default OrderSummaryDashboard;
