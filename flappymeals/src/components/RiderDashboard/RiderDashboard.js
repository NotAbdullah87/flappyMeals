import React from 'react';
import { Container, Typography, Grid, Button, Box, Card } from '@mui/material';
import RiderDashboardHeader from '../RiderDashboardHeader/RiderDashboardHeader';
import CurrentOrders from '../CurrentOrders/CurrentOrders';
import OngoingOrders from '../OngoingOrders/OngoingOrders';
import CompletedOrders from '../CompletedOrders/CompletedOrders';
import Footer from '../Footer/footer';
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RiderDashboard = () => {
 
    const rider = JSON.parse(localStorage.getItem("rider"));
      if(!rider){
        console.log("rider Not Found");
    };
    const totalEarnings = rider.earning;
    const pendingOrders = rider.pending_orders;
    const completedOrders = rider.completed_orders;
    const ratings = rider.rating;



    return (
        <div>
            <RiderDashboardHeader />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: "Jomhuria", fontSize: '5rem', color: "#D91919" }}>Dashboard</Typography>
                    <Grid container spacing={2} sx={{ textAlign: 'center' , borderRadius:"20px" , backgroundColor:"#F9F9F9"}}>
                        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center'}}>
                            <AttachMoneyIcon fontSize="large" sx={{ color: 'black', fontSize: '4rem' }} />
                            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Total Earnings</Typography>
                            <Typography variant="h4" color="black">{totalEarnings} PKR</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                            <ListAltIcon fontSize="large" sx={{ color: 'black', fontSize: '4rem' }} />
                            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Pending Orders</Typography>
                            <Typography variant="h4" color="black">{pendingOrders}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                            <DoneAllIcon fontSize="large" sx={{ color: 'black', fontSize: '4rem' }} />
                            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Completed Orders</Typography>
                            <Typography variant="h4" color="black">{completedOrders}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
                            <StarIcon fontSize="large" sx={{ color: 'black', fontSize: '4rem' }} />
                            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Josefin Sans", fontWeight: 900, color: "#D91919" }}>Ratings</Typography>
                            <Typography variant="h4" color="black">{ratings}</Typography>
                        </Grid>
                    </Grid>
                   
                    <Button variant="contained" component={Link} to="/CompletedOrders" sx={{ marginTop: 5, fontWeight: 'bold', borderRadius: '20px', backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
                        View Completed Orders
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <OngoingOrders />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CurrentOrders />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default RiderDashboard;
