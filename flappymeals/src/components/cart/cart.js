import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia,TextField } from '@mui/material';
import UserDashboardHeader from '../userDashboardHeader/userDashboardHeader';
import Footer from '../Footer/footer';
import axios from 'axios';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  let [totalPrice , settotalPrice] = useState(0);
  const [contactInfo, setContactInfo] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderS , setorderS] = useState("failed"); 


  let userId = JSON.parse(localStorage.getItem("user"));
  userId = userId.username;
  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  function generateCustomOrderId(prefix) {
    // Generate a random number between 1 and 999
    let randomNumber = Math.floor(Math.random() * 999) + 1;
  
    // Convert the number to a string and pad with leading zeros to ensure it has at least 3 digits
    let paddedNumber = String(randomNumber).padStart(3, '0');
  
    // Combine the prefix with the padded number
    return `${prefix}${paddedNumber}`;
  }
  

  // Generate and log the orderId with a custom prefix
  // console.log(generateCustomOrderId(userId.substring(3,6))); // Example with custom prefix "ABC"

  function getCurrentDate() {
    // Get current date components
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(currentDate.getDate()).padStart(2, '0');
  
    // Return the formatted date
    return `${year}-${month}-${day}`;
  }
  
  // Call the function to get the current date and log it
  // console.log(getCurrentDate());


  function getCurrentTime() {
    // Get current date components
    let currentTime = new Date();
    let hours = String(currentTime.getHours()).padStart(2, '0');
    let minutes = String(currentTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentTime.getSeconds()).padStart(2, '0');
  
    // Return the formatted time
    return `${hours}:${minutes}:${seconds}`;
  }
  
  // Call the function to get the current time and log it
  // console.log(getCurrentTime());

  // Function to handle checkout
  const handleCheckout = async () => {
    // Your checkout logic here
    console.log("Cart:",cartItems)
    console.log('Contact Information:', contactInfo);
    console.log('Pickup Location:', pickupLocation);
    console.log('Destination Location:', destinationLocation);
    console.log('Special Instructions:', specialInstructions);
    
    try {
      const orderItems = cartItems.map(item => ({
        itemId: item.id,
        itemName: item.name,
        quantity: item.quantity,
        pricePerItem: item.price,
        ImageUrl:item.image,
      }));
  
      const orderData = {
        orderId: generateCustomOrderId(userId.substring(3,6)),
        orderDate: getCurrentDate(),
        orderTime: getCurrentTime(),
        customerId: userId,
        customerContact: contactInfo,
        items: orderItems,
        totalPrice: totalPrice,
        pickupLocation: pickupLocation,
        destinationLocation: destinationLocation,
        specialInstructions: specialInstructions
      };
  
      const response = await axios.post('https://flappy-meals-backend.vercel.app/saveOrder', orderData);
  
      console.log('Order saved successfully:', response.data);

      if(response.data){
        // setCartItems([]);
        setCartItems([]);
        // localStorage.setItem('cartItems',[]);
        localStorage.removeItem('cartItems');
      }
      // You can handle the response as needed, such as displaying a success message to the user or redirecting to another page
    } catch (error) {
      console.error('Error saving order:', error);
      // You can handle errors here, such as displaying an error message to the user
    }

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
          <Container>
          <Typography variant="h5" sx={{ml:2,mt:10,fontFamily:"Josefin Sans",fontWeight:900 , color:"black"}}>PKR {totalPrice}/-</Typography>
          <Typography variant="h5" sx={{ml:2,mt:1,fontFamily:"Josefin Sans",fontWeight:900 , color:"black"}}> Delivery Charges Rs 50/-/-</Typography>
         <Typography variant="h5" sx={{mt:1,ml:2,fontFamily:"Josefin Sans",fontWeight:900 , color:"#D91919"}}><hr></hr> TotalPrice :  Rs {totalPrice+=50}</Typography>
         </Container>

         <TextField
            id="contact-info"
            label="Contact Information"
            variant="outlined"
            fullWidth
            margin="normal"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
          <TextField
            id="pickup-location"
            label="Pickup Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
          <TextField
            id="destination-location"
            label="Destination Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
          />
          <TextField
            id="special-instructions"
            label="Special Instructions"
            variant="outlined"
            fullWidth
            margin="normal"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />

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
