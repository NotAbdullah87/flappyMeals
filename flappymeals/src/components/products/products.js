import React from 'react'
import { Container,Typography,TextField,Grid,Button,Paper, SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// const foodItems = [
//     { id: 1, name: 'Burger', description: 'Delicious burger with cheese and fries', imageUrl: 'https://i.ibb.co/7S4Sq9m/burger.png',price:250 },
//     { id: 2, name: 'Pizza', description: 'Tasty pizza with various toppings', imageUrl: 'https://i.ibb.co/Np6Lgxy/pizza.png',price :200 },
//     { id: 3, name: 'Sandwitch', description: 'Fresh Salad with lettuce and BBQ Chicken', imageUrl: 'https://i.ibb.co/DC34CdZ/sandwich.png', price :150},
//     { id: 4, name: 'Biryani', description: 'Mouthwatering Half Chicken Biryani', imageUrl: 'https://i.ibb.co/WKsjWyT/biryani.png',price : 250 },
//     { id: 5, name: 'Banana Shake', description: 'Fresh Banana Shake', imageUrl: 'https://i.ibb.co/5k8YMCP/banana-Shake.png',price : 160 },
//     { id: 6, name: 'Masala Lays ', description: 'Masala Lays', imageUrl: 'https://i.ibb.co/xfxkfMz/lays.png', price : 50 },
//   ];


export const Products = () => {

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
      // Fetch items from the API
      const fetchItems = async () => {
          try {
              const response = await axios.get('http://localhost:5038/items');
              setFoodItems(response.data);
          } catch (error) {
              console.error('Error fetching items:', error);
          }
      };

      fetchItems();
  }, []);



  return (
    <div>    

<Grid container spacing={2}>
      {foodItems.map((food) => (
        <Grid item xs={12} sm={6} md={3} key={food.id}>
          <Paper elevation={3} style={{ padding: '20px' , borderRadius:"20px" , backgroundColor:"#F9F9F9"}}>
            <img src={ food.imageUrl} alt={food.name} style={{ width: '100%', marginBottom: '10px' }} />
            <Typography variant="h6" gutterBottom sx ={{fontFamily:"Josefin Sans",fontWeight:900}}>
              {food.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px', fontFamily:"Josefin Sans" }}>
              {food.description}
            </Typography>
            <Container sx={{display:"flex"}}>
            <Button variant="contained" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 4,ml:-2 ,mb: { xs: 2, md: 0 },  backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
            <Link style={{textDecoration:"none",color:"white"}} to={`/userDashboard/viewItems/${food.id}`} state={{id:food.id,price:food.price,name:food.name,image:food.imageUrl,d:food.description}}>
            Order
            </Link>
          </Button>
          <Typography  variant="h6" gutterBottom sx ={{fontFamily:"Josefin Sans",fontWeight:900,color:"#D91919"}}>Rs{food.price}/-</Typography>
          </Container>
          </Paper>

        </Grid>
      ))}
    </Grid>


    </div>
  )
}
