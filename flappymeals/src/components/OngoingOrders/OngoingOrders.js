import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button , CircularProgress } from '@mui/material';
import axios from 'axios';

const OngoingOrders = () => {
    const [orders, setOrders] = useState([]);  

    const updateOrderStatus = async (orderId, riderId,orderStatus) => {
      try {
          const response = await axios.post('https://flappy-meals-backend.vercel.app/updateOrderStatus', { orderId, riderId, orderStatus});
          console.log('Order status updated successfully:', response.data);
          return response.data; // Return the response data if needed
      } catch (error) {
          console.error('Error updating order status:', error.response.data);
          throw error.response.data; // Throw an error if the request fails
      }
  };

    useEffect(() => {
        const fetchOnogingOrders = async (riderId) => {
            try {
                
              const rider = JSON.parse(localStorage.getItem("rider"));
              riderId=rider.rider_id
              console.log(riderId);
                const response = await axios.post('https://flappy-meals-backend.vercel.app/ongoingOrders', { riderId });
                
                const OngoingOrders = response.data;

                setOrders(response.data);
                
                console.log("Ongoing Orders:", OngoingOrders);
                
                return OngoingOrders;
            } catch (error) {
                console.error("Error retrieving Ongoing Orders:", error);
                return [];
            }
        };
  
        fetchOnogingOrders();

        const intervalId = setInterval(fetchOnogingOrders, 5000);

        // Clean up function to clear the interval when component unmounts
        return () => clearInterval(intervalId);


    }, []);


    const handlePickup = (orderId) => {
        const rider = JSON.parse(localStorage.getItem("rider"));
        // console.log(orderId);
        // console.log(rider.rider_id);
        updateOrderStatus(orderId,rider.rider_id,'PickedUp');
    };

    // const handleDelivered = (orderId) => {
    //     const updatedOrders = orders.filter(order => order.id !== orderId);
    //     setOrders(updatedOrders);
    //     localStorage.setItem('ongoingOrders', JSON.stringify(updatedOrders));
    // };

    const handleDelivered = (orderId) => {
      const rider = JSON.parse(localStorage.getItem("rider"));
      updateOrderStatus(orderId,rider.rider_id,'PendingApproval');
    };
    if(orders.length === 0){
        return   <Container maxWidth="md" sx={{ marginTop: 4}}>
       
        <Typography variant="h3" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Ongoing Orders</Typography>
        <Container sx={{textAlign:"center"}}>
        <CircularProgress sx={{color:"#D91919"}}/>
        <Typography sx={{ fontFamily: "Josefin Sans", fontWeight: 600, color: "#D91919" }}>No Ongoing Orders</Typography>
        </Container>
        </Container>
    }else{

    return  (
    
        <div>
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Ongoing Orders</Typography>
            {/* <Grid container spacing={2}>
  {orders.map(order => (
    <Grid item xs={12} key={order.id}>
      <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: "20px", backgroundColor: "#F9F9F9" }}>
        {order.imageUrl && order.imageUrl.length > 0 && ( // Check if order.imageUrl exists and is not empty
          <CardMedia component="img" src={order.imageUrl[0]} alt={order.items.length > 0 ? order.items[0] : ''} style={{ width: "20%", padding: "20px" }} />
        )}
        <CardContent>
          <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>{order.foodItems && order.foodItems.join(', ')}</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Price: Rs{order.price}/-</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Pickup: {order.pickup}</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Destination: {order.destination}</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Status: {order.status}</Typography>

          {order.status === 'Pending' && (
            <Button variant="contained" onClick={() => handlePickup(order.id)} sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
              Pickup
            </Button>
          )}
          {order.status === 'Picked Up' && (
            <Button variant="contained" onClick={() => handleDelivered(order.id)} sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
              Delivered
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid> */}

<Grid container spacing={2}>
  {orders.map(order => (
    <Grid item xs={12} key={order.id}>
      <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: "20px", backgroundColor: "#F9F9F9" }}>
        {order.items && order.items.length > 0 && ( // Check if order.items exists and is not empty
          <CardMedia component="img" image={order.items[0].ImageUrl} alt={order.items[0].itemName} style={{ width: 150, paddingLeft: "10px", borderRadius: "50%" }} />
        )}
        <CardContent>
          {order.items && order.items.length > 0 && ( // Check if order.items exists and is not empty
            order.items.map((item, index) => (
              <Typography key={index} variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>{item.itemName}|</Typography>
            ))
          )}
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Price: Rs{order.totalPrice}/-</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Pickup: {order.pickupLocation}</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Destination: {order.destinationLocation}</Typography>
          <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Status: {order.orderStatus}</Typography>
          {/* <Button onClick={() => acceptOrder(order.orderId, "21L7732")} variant="contained" sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>Accept</Button> */}
          {/* <Button sx={{ pl: 2, pr: 2, color: "white", fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>View Details</Button> */}
          
          {order.orderStatus === 'InProgress' && (
            <Button variant="contained" onClick={() => handlePickup(order.orderId)} sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
              Pick Up
            </Button>
          )}
          {order.orderStatus === 'PickedUp' && (
            <Button variant="contained" onClick={() => handleDelivered(order.orderId)} sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
              Deliver
            </Button>
          )}

        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

        </Container>
        </div>
    );
}
};

export default OngoingOrders;
