import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import RiderDashboardHeader from '../RiderDashboardHeader/RiderDashboardHeader';
import Footer from '../Footer/footer';
import axios from 'axios'; // Import Axios for making HTTP requests

const CompletedOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch completed orders for the current rider from the backend API
        
        const fetchCompletedOrders = async () => {
            try {
                const rider = JSON.parse(localStorage.getItem("rider"));
                const riderId = rider.rider_id;
                console.log(riderId);
                const response = await axios.get(`http://localhost:5038/completedOrders?riderId=${riderId}`);
                setOrders(response.data);
                console.log(orders)
            } catch (error) {
                console.error('Error fetching completed orders:', error);
            }
        };
        
        fetchCompletedOrders();

           // Set interval to fetch orders every 5 seconds
           const intervalId = setInterval(fetchCompletedOrders, 5000);

           // Clean up function to clear the interval when component unmounts
           return () => clearInterval(intervalId);

    }, []);


    const RatingStars = ({ rating = 5}) => {
        const numFullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
    
        const renderStars = () => {
            let stars = [];
            // Render full stars
            for (let i = 0; i < numFullStars; i++) {
                stars.push(<span key={i} style={{ color: 'red' }}>&#9733;</span>);
            }
            // Render half star if exists
            if (hasHalfStar) {
                stars.push(<span key="half" style={{ color: 'red' }}>&#189;</span>);
            }
            return stars;
        };
    
        return (
            <span>
                {renderStars()}
            </span>
        );
    };
    

    if(orders.length === 0){
        return <div>Loading ...... </div>
    }else{
    return (
      
        <div>
            <RiderDashboardHeader />
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
      {/* {console.log(orders)} */}
            <Typography variant="h3" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Current Orders</Typography>
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
          {/* <Button onClick={() => acceptOrder(order.orderId)} variant="contained" sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>Accept</Button> */}
          {/* <Button sx={{ pl: 2, pr: 2, color: "white", fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>View Details</Button> */}
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


        </Container>
            
            <Footer />
        </div>
    );}
};

export default CompletedOrders;
