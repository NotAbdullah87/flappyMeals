import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import UserDashboardHeader from '../userDashboardHeader/userDashboardHeader';
import Footer from '../Footer/footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  let [totalPrice , settotalPrice] = useState(0);
  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };



  // Function to handle checkout
  const handleCheckout = () => {
    // Your checkout logic here
  };

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <div>
        <UserDashboardHeader />
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h3" gutterBottom sx={{fontFamily:"Josefin Sans",fontWeight:900,color:"#D91919"}}>Cart Items</Typography>
      {cartItems.length > 0 ? (
        <Grid container spacing={2}>
          {cartItems.map(item => (
            <Grid  item xs={12} key={item.id}>
              <Card o sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CardMedia component="img" src={item.image} alt={item.name} style={{width:"20%",padding:"20px"}} />
                <CardContent>
                  <Typography  variant="h6" sx={{fontFamily:"Josefin Sans",fontWeight:900}}>{item.name}</Typography>
                  <Typography variant="body1" sx={{fontFamily:"Josefin Sans",fontWeight:900,color:"#D91919"}}>Quantity: {item.quantity}</Typography>
                <Typography sx={{fontFamily:"Josefin Sans",fontWeight:900}}>Rs{item.price}</Typography>
                <Typography variant='body1' sx={{color:"#D91919",fontWeight:900}}>{item.quantity} x {item.price} = {parseInt(item.quantity) * parseInt(item.price)} </Typography>
                <div style={{display:"none"}}>{totalPrice += parseInt(item.quantity) * parseInt(item.price)}</div>
                  <Button onClick={() => removeFromCart(item.id)} variant="contained"  sx={{mt:2 ,fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>Remove</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Typography variant="h5" sx={{ml:2,mt:10,fontFamily:"Josefin Sans",fontWeight:900 , color:"#D91919"}}>Total : PKR {totalPrice}/-</Typography>
          <Grid item xs={12}>
            <Button onClick={handleCheckout} variant="contained"  sx={{mt:2 ,fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>Checkout</Button>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ml:2,mt:10,mb:30,fontFamily:"Josefin Sans",fontWeight:900 , color:"#D91919"}}>Your cart is empty.</Typography>
      )}
    </Container>

    <Footer />
    </div>
  );
};

export default Cart;
