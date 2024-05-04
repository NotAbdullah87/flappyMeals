import React from 'react'
import Header from '../Header/header';
import Footer from '..//Footer/footer';
import { Container,Typography,TextField,Grid,Button,Paper, SvgIcon } from '@mui/material';
import Love from './love.svg'
const foodItems = [
    { id: 1, name: 'Burger', description: 'Delicious burger with cheese and fries', imageUrl: 'https://i.ibb.co/7S4Sq9m/burger.png' },
    { id: 2, name: 'Pizza', description: 'Tasty pizza with various toppings', imageUrl: 'https://i.ibb.co/s634GZN/pizza.png' },
    { id: 3, name: 'Sushi', description: 'Fresh sushi rolls with wasabi and soy sauce', imageUrl: 'sushi.jpg' },
    { id: 4, name: 'Salad', description: 'Healthy salad with mixed greens and dressing', imageUrl: 'salad.jpg' },
    { id: 5, name: 'Pasta', description: 'Italian pasta with tomato sauce and parmesan cheese', imageUrl: 'pasta.jpg' },
    { id: 6, name: 'Steak', description: 'Juicy steak cooked to perfection', imageUrl: 'steak.jpg' },
  ];

const userDashboard = () => {
  return (
    <div>
        {/* <Header/> */}

        <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{fontFamily:"Jomhuria",fontSize:'5rem',color:"#D91919"}}>
      Something hot. Something tasty. <img src={Love} width={70} style={{translateY:"20vh"}}/>
      </Typography>
      
      
      <div style={{paddingBottom:"5vh"}}>
      <div style={{ width: '100%', position: 'relative', display: 'flex' }}>
        <input
          type="text"
          style={{
            width: '80%',
            border: '3px solid #D91919',
            borderRight: 'none',
            padding: '5px',
            height: '20px',
            borderRadius: '5px 0 0 5px',
            outline: 'none',
            color: 'White',
            backgroundColor:"#D91919",
            '::placeholder': { color: 'white' }
          }}
        //   placeholder="What are you looking for?"
        />
        <button
          type="submit"
          style={{
            width: '40px',
            height: '36px',
            border: '1px solid #D91919',
            background: '#D91919',
            textAlign: 'center',
            color: '#fff',
            borderRadius: '0 5px 5px 0',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          <i className="fa fa-search"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" color='#0000'>
<path fill="#ffffff" d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
</svg></i>
        </button>
      </div>
    </div>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom sx={{fontFamily:"Josefin Sans",fontWeight:900}}>
          Popular Products
        </Typography>
        <Button variant="contained" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
            View All
          </Button>
      </Grid>
      <Grid container spacing={2}>
      {foodItems.map((food) => (
        <Grid item xs={12} sm={6} md={3} key={food.id}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <img src={ food.imageUrl} alt={food.name} style={{ width: '100%', marginBottom: '10px' }} />
            <Typography variant="h6" gutterBottom>
              {food.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              {food.description}
            </Typography>
            <Button variant="contained" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
            Order
          </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </Container>

        <Footer/>

    </div>
  )
}

export default userDashboard