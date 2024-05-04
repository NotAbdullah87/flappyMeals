import React, { useEffect, useState } from 'react';
import { Container,Typography,TextField,Grid,Button,Paper, SvgIcon } from '@mui/material';
import { useLocation } from 'react-router';
import UserDashboardHeader from '../userDashboardHeader/userDashboardHeader';
import Footer from '../Footer/footer';




const ProductDetailPage = ({}) => {


  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const { state } = location;
  const price = state.price
  const id = state.id ;
  const name = state.name ; 
  
  // Ensure state is not null and price is accessible
// Function to add item to cart array in local storage
const addToCart = (item,q) => {
  // console.log(quantity);
  console.log(q);
  console.log(item);
  console.log(localStorage);
  // Retrieve cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Check if the item is already in the cart
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    // If the item is already in the cart, update its quantity
    existingItem.quantity += 1;
  } else {
    // If the item is not in the cart, add it
    cartItems.push({ ...item, quantity: q });
  }

  // Save the updated cart items to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
   

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };



   return (
    <div>
      <UserDashboardHeader />
    <div style={{ padding: '16px',marginTop:"10vw" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{textAlign:"center"}}>
          <img
            src={state.image}
            alt={name}
            style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{mt:7,borderStyle:"none",boxShadow:"none"}}>
          <Paper style={{ padding: '16px',boxShadow:"none" }}>
            <Typography variant="h4" gutterBottom sx={{fontFamily:"Josefin Sans",fontWeight:900,color:"#D91919"}}>
              {name}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{fontFamily:"Josefin Sans",fontWeight:900,color:"black"}} >
              {state.d}
            </Typography>
          
            <Typography variant="h6" gutterBottom sx={{mb:3,mt:4,fontFamily:"Josefin Sans",fontWeight:900,color:"white",width:"10rem",borderRadius:"15px",padding:"4px",textAlign:"center",backgroundColor:"#D91919"}}>
              Price: ${price}
            </Typography>
            <TextField
              id="quantity"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <br></br>
            <Button onClick={() => addToCart(state,quantity)} variant="contained" sx={{mt:2 ,fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>

    <Footer />
    </div>
  );
};

export default ProductDetailPage;
