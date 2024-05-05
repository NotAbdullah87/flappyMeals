import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const CurrentOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const Orders = [
            { id: 1, foodItems: ['Pizza', 'Biryani'], price: 300, pickup: 'Cafe', destination: 'Love Garden',status:'Pending', imageUrl: ['https://i.ibb.co/Np6Lgxy/pizza.png', 'https://i.ibb.co/WKsjWyT/biryani.png'], timer: 300 },
            { id: 2, foodItems: ['Burger', 'Sandwich'], price: 200, pickup: 'Cafe', destination: 'Civil Department',status:'Pending', imageUrl: ['https://i.ibb.co/7S4Sq9m/burger.png', 'https://i.ibb.co/DC34CdZ/sandwich.png'], timer: 300 },
            { id: 3, foodItems: ['Masala Lays '], price: 50, pickup: 'Cafe', destination: 'New Building',status:'Pending', imageUrl: ['https://i.ibb.co/xfxkfMz/lays.png'], timer: 300 },
        ];

        setOrders(Orders);
    }, []);


    const acceptOrder = (orderId) => {
        const acceptedOrder = orders.find(order => order.id === orderId);
        const ongoingOrders = JSON.parse(localStorage.getItem('ongoingOrders')) || [];
        ongoingOrders.push(acceptedOrder);
        localStorage.setItem('ongoingOrders', JSON.stringify(ongoingOrders));
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        removeOrder(orderId);
    };
    
    // remove an order after the timer reaches zero
    const removeOrder = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };

    // update timer for each order and remove order if timer reaches zero
    useEffect(() => {
        const intervalId = setInterval(() => {
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    timer: order.timer > 0 ? order.timer - 1 : 0
                })).filter(order => order.timer > 0)
            );
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
                        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , borderRadius:"20px" , backgroundColor:"#F9F9F9"}}>
                            <CardMedia component="img" src={order.imageUrl[0]} alt={order.foodItems[0]} style={{ width: "20%", padding: "20px" }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>{order.foodItems.join(', ')}</Typography>
                                <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Price: Rs{order.price}/-</Typography>
                                <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Pickup: {order.pickup}</Typography>
                                <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Destination: {order.destination}</Typography>
                                <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Time left: {formatTime(order.timer)}</Typography>
                                <Button onClick={() => acceptOrder(order.id)} variant="contained" sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>Accept</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CurrentOrders;