import React, {  useState } from 'react';
import {Typography,TextField,Grid,Button ,Paper,Box,CircularProgress} from '@mui/material';
import { useLocation } from 'react-router';
import UserDashboardHeader from '../userDashboardHeader/userDashboardHeader';
import Footer from '../Footer/footer';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';


const ProductDetailPage = () => {

  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loadingText,setLoadingText] = useState("Please Wait ...");

  const location = useLocation();
  const { state } = location;
  const price = state.price
  // const id = state.id ;
  const name = state.name ; 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Ensure state is not null and price is accessible
// Function to add item to cart array in local storage
const addToCart = (item,q) => {
  // console.log(quantity);

  setOpen(true)
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
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(0px)",
    
   }}
      >
        <Box sx={{  position: "absolute",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p:4,
  background:"white",
  borderRadius:"10px"
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily:"Josefin Sans",fontWeight:900,color:"#D91919"}}>
           Order Successful !! 
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily:"Josefin Sans",fontWeight:900,color:"#D91919"}}>
           Check your Cart To Proceed Further
          </Typography>
          <Button
        type="submit"
        // fullWidth
        variant="contained"
       
        style={{ margin: '20px 0 16px',backgroundColor:"#D91919" , '&:hover':{backgroundColor :"black"} }}
      >
        <Link to='/userDashboard/viewCart' style={{textDecoration:"none",color:"white",fontFamily:"Josefin Sans"}}>View Cart</Link>
      </Button>
        </Box>
      </Modal>
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
              Price: Rs {price}
            </Typography>
            <TextField
              id="quantity"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 1, // Set your desired min value
                max: 10, // Set your desired max value
              }}
              // width={'100%'}
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
