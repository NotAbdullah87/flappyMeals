import React from 'react'
import Footer from '..//Footer/footer';
import { Container,Typography,TextField,Grid,Button,Paper, SvgIcon } from '@mui/material';
import UserDashboardHeader from '../userDashboardHeader/userDashboardHeader';
import Love from './love.svg'
import { Products } from '../products/products'; 
import { Link } from 'react-router-dom';
const foodItems = [
    { id: 1, name: 'Burger', description: 'Delicious burger with cheese and fries', imageUrl: 'https://i.ibb.co/7S4Sq9m/burger.png',price:250 },
    { id: 2, name: 'Pizza', description: 'Tasty pizza with various toppings', imageUrl: 'https://i.ibb.co/Np6Lgxy/pizza.png',price :200 },
    { id: 3, name: 'Sandwitch', description: 'Fresh Salad with lettuce and BBQ Chicken', imageUrl: 'https://i.ibb.co/DC34CdZ/sandwich.png', price :150},
    { id: 4, name: 'Biryani', description: 'Mouthwatering Half Chicken Biryani', imageUrl: 'https://i.ibb.co/WKsjWyT/biryani.png',price : 250 },
    { id: 5, name: 'Banana Shake', description: 'Fresh Banana Shake', imageUrl: 'https://i.ibb.co/5k8YMCP/banana-Shake.png',price : 160 },
    { id: 6, name: 'Masala Lays ', description: 'Masala Lays', imageUrl: 'https://i.ibb.co/xfxkfMz/lays.png', price : 50 },
  ];

  const orders = [
    { orderNumber: 'ORD001', productName: 'Burger',orderStatus:"In Progress"},
    { orderNumber: 'ORD002', productName: 'Pizza',orderStatus:"Delivered"},
  ];

  
  function displayProductDetailPage(name){
    console.log(name)
  }


  const userDashboard = () => {
  return (
    <div>
        {/* <Header/> */}

        <UserDashboardHeader />
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
            padding: '10px',
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
            height: '46px',
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
        <Button  variant="contained" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
           <Link to={"/userDashboard/viewItems"} style={{textDecoration:"none",color:"white"}}>View All</Link>
          </Button>
      </Grid>

          
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
            
            <Button  variant="contained" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 4,ml:-2 ,mb: { xs: 2, md: 0 },  backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
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

          {/* Current ORder */}
    <Paper style={{ padding: '16px',
    marginTop: '16px',
    textAlign: 'center',}} >
      <Typography variant="h5" gutterBottom style={{fontFamily:"Josefin Sans",fontWeight:900}}>
        Current Orders
      </Typography>
      {orders.length > 0 ? (
        <div>
          {/* Render current orders */}
          {orders.map((order, index) => (
            <div key={index} style={{backgroundColor:"#FD6C6C",color:"black",fontFamily:"Josefin Sans",padding:"10px",width:"50vw",fontWeight:900,borderRadius:"25px",marginBottom :"10px"}}>
              {/* Display order details */}
              <Typography variant="body1" sx={{fontFamily:"Josefin Sans",fontWeight:900,color:'white'}}>
                Order #{index + 1}: {order.orderNumber} - {order.productName} | {order.orderStatus}
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1">
          You don't have any current orders.
        </Typography>
      )}
    </Paper>
    </Container>

        <Footer/>

    </div>
  )
}

export default userDashboard