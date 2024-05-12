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
                const riderId=rider.rider_id;
                console.log(riderId);
                const response = await axios.get(`http://localhost:5038/completedOrders`,{riderId});
                setOrders(response.data);
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
    


    return (
        <div>
            <RiderDashboardHeader />
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Typography variant="h3" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Completed Orders</Typography>
                <Grid container spacing={2}>
                    {orders.map(order => (
                        <Grid item xs={12} key={order.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , borderRadius:"20px" , backgroundColor:"#F9F9F9"}}>
                                <CardMedia component="img" src={order.imageUrl[0]} alt={order.foodItems[0]} style={{ width: "20%", padding: "20px" }} />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>{order.foodItems.join(', ')}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Price: Rs{order.totalPrice}/-</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Pickup: {order.pickupLocation}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Destination: {order.destinationLocation}</Typography>
                                    {/* <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Rating: <RatingStars rating={order.rating} /></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Feedback: {order.feedback}</Typography> */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default CompletedOrders;
