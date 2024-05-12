import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'axios';
import Icon from './img.png';

const CurrentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const updateOrderStatus = async (orderId, riderId) => {
      try {
          const response = await axios.post('http://localhost:5038/updateOrderStatus', { orderId, riderId });
          console.log('Order status updated successfully:', response.data);
          return response.data; // Return the response data if needed
      } catch (error) {
          console.error('Error updating order status:', error.response.data);
          throw error.response.data; // Throw an error if the request fails
      }
  };


    useEffect(() => {
        
        const fetchAvailableOrders = async () => {
            try {
              const response = await axios.get('http://localhost:5038/orders/available');
              const or = response.data;
              console.log('Orders with null rider:', or);
              setOrders(or);
              // Process the orders as needed
            } catch (error) {
              console.error('Error fetching orders:', error);
              // Handle error
            }
          };
          
          // Call the function to fetch orders
          fetchAvailableOrders();

            // Set interval to fetch orders every 5 seconds
        const intervalId = setInterval(fetchAvailableOrders, 5000);

        // Clean up function to clear the interval when component unmounts
        return () => clearInterval(intervalId);


    }, []);


    const acceptOrder = (orderId,rideId) => {
        // const acceptedOrder = orders.find(order => order.id === orderId);
        // const ongoingOrders = JSON.parse(localStorage.getItem('ongoingOrders')) || [];
        // ongoingOrders.push(acceptedOrder);
        // localStorage.setItem('ongoingOrders', JSON.stringify(ongoingOrders));
        // setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        // removeOrder(orderId);
        console.log(orderId); 
        updateOrderStatus(orderId,rideId); 
      };
    
    // remove an order after the timer reaches zero
    const removeOrder = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };

  
    // format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
     <Container maxWidth="md" sx={{ marginTop: 4 }}>

            <Typography variant="h3" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Current Orders</Typography>
            <Grid container spacing={2}> 
  {orders.map(order => (
    <Grid item xs={12} key={order.id}>
      <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: "20px", backgroundColor: "#F9F9F9" }}>
     <CardMedia component="img" image={order.items[0].ImageUrl} alt={order.items[0].itemName} style={{width:150, paddingLeft:"10px" , borderRadius: "50%" }} />
        <CardContent>
          {order.items.map((item, index) => (
            <Typography key={index} variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>{item.itemName}|</Typography>
          ))}
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Price: Rs{order.totalPrice}/-</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Pickup: {order.pickupLocation}</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Destination: {order.destinationLocation}</Typography>
          <Button onClick={() => acceptOrder(order.orderId,"21L7732")} variant="contained" sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>Accept</Button>
          <Button sx={{ pl:2,pr:2,color:"white",fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>View Details</Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

        </Container>
    );
};

export default CurrentOrders;