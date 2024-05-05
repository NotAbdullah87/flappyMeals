import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import RiderDashboardHeader from '../RiderDashboardHeader/RiderDashboardHeader';
import Footer from '../Footer/footer';

const CompletedOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const mockOrders = [
            { id: 1, foodItems: ['Pizza', 'Biryani'], price: 300, pickup: 'Cafe', destination: 'Love Garden', rating: 4.5, feedback: 'Great service!' , imageUrl: ['https://i.ibb.co/Np6Lgxy/pizza.png', 'https://i.ibb.co/WKsjWyT/biryani.png'] },
            { id: 2, foodItems: ['Burger', 'Sandwich'], price: 200, pickup: 'Cafe', destination: 'Civil Deptartment', rating: 5, feedback: 'Excellent experience!' , imageUrl: ['https://i.ibb.co/7S4Sq9m/burger.png', 'https://i.ibb.co/DC34CdZ/sandwich.png']},
            { id: 2, foodItems: ['Lays'], price: 50, pickup: 'Cafe', destination: 'Civil Deptartment', rating: 3, feedback: 'Excellent experience!' , imageUrl: ['https://i.ibb.co/xfxkfMz/lays.png']},
        ];

        setOrders(mockOrders);
    }, []);


    const RatingStars = ({ rating }) => {
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
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Price: Rs{order.price}/-</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Pickup: {order.pickup}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Destination: {order.destination}</Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Rating: <RatingStars rating={order.rating} /></Typography>
                                    <Typography variant="body1" sx={{ fontFamily: "Josefin Sans", fontWeight: 900 }}>Feedback: {order.feedback}</Typography>
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
