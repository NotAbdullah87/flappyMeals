import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Cart from './cart.png';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const UserDashboardHeader = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  

  return (
    <AppBar position="static" style={{backgroundColor:"white",boxShadow:"none",color:"#D91919"}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            textDecoration:"none",
            color:"inherit",
            fontFamily:"Jomhuria",
            pl:"37px",
            pt : "20px"
          }}
          
         style={{fontFamily:"Jomhuria",fontSize:"50px"}}
        >
          <Link style={{textDecoration:"none",color:"#D91919"}} to={'/'}>Flappy Meals</Link>
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="#00000"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
              
              color:"black"
            }}
            
            stlye={{color:"black",fontFamily:"Jomhuria"}}           
          >
            <MenuItem onClick={handleCloseNavMenu} style={{color:"inherit"}}>
                <Typography textAlign="center"> <Link style={{textDecoration:"none",color:"black"}} to={'/userDashboard'}>Home</Link></Typography>
              </MenuItem>
    
              <MenuItem onClick={handleCloseNavMenu} style={{color:"inherit"}}>
                <Typography textAlign="center"> <Link style={{textDecoration:"none",color:"black"}} to={'/userDashboard/viewCart'}>View Cart</Link></Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} style={{color:"inherit"}}>
                <Typography textAlign="center"> <Link style={{textDecoration:"none",color:"black"}} to={'/userDashboard/viewItems'}>Order Now</Link></Typography>
              </MenuItem>
              </Menu>
        </Box>
        
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'Jomhuria',
            fontWeight: 500,
            letterSpacing: '.1rem',
            color: 'inherit',
            fontSize:60,
            textDecoration: 'none',
          }}
      
        >
         <Link style={{textDecoration:"none",color:"#D91919"}} to={'/'}>Flappy Meals</Link>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },pl:60 }}>
        
            <Button
             
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block',ml:10}}
              style={{color:"inherit",fontWeight:900}}
              
            >
           <Link style={{textDecoration:"none",color:"#D91919"}} to={'/userDashboard'}>Home</Link>
            </Button>
         
            <Button
             
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block',ml:10}}
              style={{color:"inherit",fontWeight:900}}
              
            >
         <Link style={{textDecoration:"none",color:"#D91919"}} to={'/userDashboard/viewCart'}>View Cart</Link>
            </Button>
         
            <Button
              style={{color:"white",fontWeight:900}}
             id='sign-up-button'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block',ml:7, backgroundColor:'#D91919' , "&:hover":{backgroundColor:"black"}
            ,borderRadius:30,width:"30%"}}
        
              
            >
           <Link style={{textDecoration:"none",color:"white"}} to={'/userDashboard/viewItems'}>Order Now</Link>
            </Button>

        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={{color:'black'}}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            color
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default UserDashboardHeader