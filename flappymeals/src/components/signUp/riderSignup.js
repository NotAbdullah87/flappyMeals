import React, { useState } from 'react'
import Header from '../Header/header';
import Footer from '..//Footer/footer';
import { Container,Typography,Grid,TextField,Checkbox,Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const RiderSignup = () => {

    function isValidFormat(str) {
        // Check if the string length is 7
        if (str.length !== 7) {
          return false;
        }
      
        // Check if the character at index 2 is 'L' and all other characters are numeric
        for (let i = 0; i < str.length; i++) {
          if (i === 2) {
            // Check if the character at index 2 is 'L'
            if (str[i] !== 'L') {
              return false;
            }
          } else {
            // Check if all other characters are numeric
            if (!/[0-9]/.test(str[i])) {
              return false;
            }
          }
        }
      
        // If all checks pass, return true
        return true;
      }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        // Get the username and password values from the form fields
        const username = event.target.username.value;
        const password = event.target.password.value;
        // let [status,setStatus] = useState(-1)
        console.log(username)
        // Check if the username matches the required format
   if(isValidFormat(username)){
        
    try {
        const response = await fetch('https://flappy-meals-backend.vercel.app/Ridersignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          // Signup successful
          console.log('Signup successful');
          alert("Signup Successful")
          // Redirect to another page or perform other actions
        } else {
          const data = await response.json();
          console.error('Signup failed:', data.message);
          alert("SignUp Failed",data.message)
        }
      } catch (error) {
        console.error('Error:', error);
      }}else{
        console.log("wrong format")
        alert("Wrong Username Format")
      }
        // If the username format is correct, proceed with signing up (you can call your API here)
        // Example API call:
        // fetch('your-api-url', {
        //   method: 'POST',
        //   body: JSON.stringify({ username, password }),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        // .then(response => {
        //   if (response.ok) {
        //     // Handle successful signup
        //   } else {
        //     // Handle signup failure
        //   }
        // })
        // .catch(error => console.error('Error:', error));
      };
    

  return (
    <div>
             <Header/>
           
    <Container style={{marginBottom:"150px", boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",padding:"10px",paddingBottom:"30px",marginTop:"100px"}}>
   
        
        {/* Right Column */}
        <Grid xs={12} sm={6} style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        //   boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          }}>
          <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom  style={{ fontFamily: 'Josefin Sans', color:"#D91919" , fontWeight:900 , fontSize: { xs: '1rem', md: '1.2rem' } }}>
              Rider Sign Up
            </Typography>
            <form onSubmit={HandleSubmit}>
               
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Typography sx={{fontFamily:"Josefin Sans",color:"#D91919",fontWeight:700}}>Important Instructions : </Typography>
              
               <Typography sx={{fontFamily:"Josefin Sans",color:"#D91919"}}>Username format Must Be : xxLxxxx</Typography>
              <Container sx={{display:"flex",textAlign:"center",mt:4}}>
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'I accept the agreement' }}
              />
              <Typography variant="body2" mt={1}>
                I accept the <a href="#">terms and conditions</a>
              </Typography>
              </Container>
              <Button
            type="submit"
            fullWidth
            variant="contained"
          
            style={{ margin: '24px 0 16px',backgroundColor:"#D91919" , '&:hover':{backgroundColor :"black"} }}
          >
            <Link style={{textDecoration:"none",color:"white"}}>Sign Up</Link>
          </Button>
          <Button
        fullWidth
      component={Link}
      to="/signup/customer"
      style={{
        color: "#D91919",
        backgroundColor: "white",
        border: "3px solid #D91919",
        '&:hover': {
          backgroundColor: "black",
          color: "white",
          fontFamily:"Josefin Sans",
          fontWeight:900
          ,width:"100%"
        }
      }}
    >
      Customer Sign Up
    </Button>  
            </form>
          </div>
       
      </Grid>
    </Container>
         
    <Footer />
    </div>
  )
}

export default RiderSignup