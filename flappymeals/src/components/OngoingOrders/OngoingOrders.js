import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'axios';

const OngoingOrders = () => {
    const [orders, setOrders] = useState([]);  

    useEffect(() => {
        const fetchOnogingOrders = async (riderId) => {
            try {
              const rider = JSON.parse(localStorage.getItem("rider"));
              riderId=rider.rider_id
              console.log(riderId);
                const response = await axios.post('http://localhost:5038/ongoingOrders', { riderId });
        
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

    }, []);


    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
        // Update local storage
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        localStorage.setItem('ongoingOrders', JSON.stringify(updatedOrders));
    };

    const handlePickup = (orderId) => {
        updateOrderStatus(orderId, 'Picked Up');
    };

    // const handleDelivered = (orderId) => {
    //     const updatedOrders = orders.filter(order => order.id !== orderId);
    //     setOrders(updatedOrders);
    //     localStorage.setItem('ongoingOrders', JSON.stringify(updatedOrders));
    // };

    const handleDelivered = (orderId) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: 'Pending Approval' } : order
            )
        );
        localStorage.setItem('ongoingOrders', JSON.stringify(orders.map(order =>
            order.id === orderId ? { ...order, status: 'Pending Approval' } : order
        )));
    };

    return (
        orders && <div>
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Ongoing Orders</Typography>
            <Grid container spacing={2}>
                {orders.map(order => (
                    <Grid item xs={12} key={order.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , borderRadius:"20px" , backgroundColor:"#F9F9F9"}}>
                        <CardMedia component="img" src={order.imageUrl[0]} alt={order.foodItems[0]} style={{ width: "20%", padding: "20px" }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>{order.foodItems.join(', ')}</Typography>
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
            </Grid>
        </Container>
        </div>
    );
};

export default OngoingOrders;
