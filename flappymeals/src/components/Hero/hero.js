import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from './image.jpg'; 
import MobileImage from './mobile.png'; 
function Hero() {
  return (
    <Box sx={{ position: 'relative', backgroundColor: 'white' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: { xs: 6, md: 10 }, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: '1 1 100%', maxWidth: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h3" color="black" fontWeight="bold" gutterBottom style={{ fontFamily: 'Josefin Sans' }}>
            Food Delivery
          </Typography>
          <Typography variant="h3" color="black" fontWeight="bold" gutterBottom style={{ fontFamily: 'Josefin Sans' }}>
            Within 10{' '}
            <Typography variant="h3" color="#D91919" fontWeight="bold" gutterBottom style={{ fontFamily: 'Josefin Sans' }}>
              minutes
            </Typography>
          </Typography>
          <Typography variant="h6" color="black" fontWeight="medium" gutterBottom style={{ fontFamily: 'Josefin Sans', fontSize: { xs: '1rem', md: '1.2rem' } }} sx={{ mb: 2 }}>
            FAST 1st In-campus Food Delivery
          </Typography>
          <Typography variant="h6" color="black" fontWeight="medium" gutterBottom style={{ fontFamily: 'Josefin Sans', fontSize: { xs: '1rem', md: '1.2rem' } }} sx={{ mb: 2 }}>
            System Drinks, Food & much more.
          </Typography>
          <Button variant="contained" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', mr: 2, mb: { xs: 2, md: 0 }, backgroundColor: '#D91919', '&:hover': { backgroundColor: '#A70D0D' } }}>
            Order now
          </Button>
          <Button variant="outlined" sx={{ fontWeight:'bold', fontFamily: 'Josefin Sans', borderRadius: '20px', borderColor: '#D91919', color: '#D91919', '&:hover': { backgroundColor: '#D91919', color: 'white' } }}>
            Work with us
          </Button>
        </Box>
        <Box sx={{ flex: '1 1 100%', maxWidth: { xs: '100%', md: '50%' }, position: 'relative', textAlign: { xs: 'center', md: 'right' } }}>
          <img src={Image} alt="Delivery" style={{ width: '100%', height: 'auto' }} />
          <img src={MobileImage} alt="Mobile" style={{ position: 'absolute', top: '94%', left: '-90%', width: 'auto', height: '400px', zIndex: 1 }} />
        </Box>
      </Container>
      <Box sx={{ position: 'relative', backgroundColor: '#D91919', py:  { xs: 4, md: 11 }, borderRadius: '80px', textAlign: '-webkit-left', mx: { xs: 3, md: '95px' } ,  clipPath: 'polygon(0 0, 10% 0, 500% 100%, 0% 100%)'}}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '80%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="body1" color="white">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Josefin Sans', fontStyle: 'italic', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Easy Steps to Order :
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Josefin Sans', fontSize: { xs: '1rem', md: '1.2rem' } }}>
            1. Select from a wide range of Menu
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Josefin Sans', fontSize: { xs: '1rem', md: '1.2rem' } }}>
            2. Place Order
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Josefin Sans', fontSize: { xs: '1rem', md: '1.2rem' } }}>
            3. Pay the Rider & Enjoy your meal
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: {  xs: '1.5rem', md: '1.7rem'  } }}>
            روٹی .... کہیں بھی ، کبھی بھی ....
          </Typography>
        </Typography>
      </Box>
    </Container>
      </Box>
    </Box>
  );
}

export default Hero;