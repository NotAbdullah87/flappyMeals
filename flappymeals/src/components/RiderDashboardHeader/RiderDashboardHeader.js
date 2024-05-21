import * as React from 'react';
import { withRouter } from 'react-router-dom';
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CompletedOrders from '../CompletedOrders/CompletedOrders';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const settings = ['Profile', 'Logout'];

const RiderDashboardHeader = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);
    const navigate = useNavigate();


    const rider = JSON.parse(localStorage.getItem("rider"));
      if(!rider){
        console.log("rider Not Found");
    };

   
    useEffect(() => {

      const user = JSON.parse(localStorage.getItem("rider"));
      if(!user){
        console.log("Rider Not Found");
        navigate('/login')
      }

    },[]);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleLogout = () => {
      // Clear rider information from local storage
      localStorage.removeItem('rider');
      navigate('/');
  };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleNotifications = () => {
      
    };

  return (
    <AppBar position="static" style={{ backgroundColor: "white", boxShadow: "none", color: "#D91919" }}>
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
              textDecoration: "none",
              color: "inherit",
              fontFamily: "Jomhuria",
              pl: "37px",
              pt: "20px"
            }}
            style={{ fontFamily: "Jomhuria", fontSize: "50px" }}
          >
            <Link style={{ textDecoration: "none", color: "#D91919" }} onClick={handleLogout}>
              Flappy Meals
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
                color: "black"
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} style={{ color: "inherit" }}>
                <Typography textAlign="center">
                  <Link style={{ textDecoration: "none", color: "black" }} 
                  to={'/RiderDashboard'}>Home</Link>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} style={{ color: "inherit" }}>
                <Typography textAlign="center">
                  <Link style={{ textDecoration: "none", color: "black" }} 
                  to={'/CompletedOrders'}>Orders</Link>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu} style={{ color: "inherit" }}>
                <Typography textAlign="center">
                  <Link style={{ textDecoration: "none", color: "black" }} 
                  to={'/riderDashboard'}>Notifications</Link>
                </Typography>
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
              fontSize: 60,
              textDecoration: 'none',
            }}
          >
            <Link style={{ textDecoration: "none", color: "#D91919" }} to={'/'}>
              Flappy Meals
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pl: 60 }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', ml: 9 }}
              style={{ color: "inherit", fontWeight: 900 }}
            >
              <Link style={{ textDecoration: "none", color: "#D91919" }} 
              to={'/RiderDashboard'}>Home</Link>
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', ml: 9 }}
              style={{ color: "inherit", fontWeight: 900 }}
            >
              <Link style={{ textDecoration: "none", color: "#D91919" }} 
              to={'/CompletedOrders'}>Orders</Link>
            </Button>
            <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block', ml: 9 }}
          style={{ color: "inherit", fontWeight: 900 }}
        >
          <Link style={{ textDecoration: "none", color: "#D91919" }} 
          to={'/riderDashboard/notifications'}
          >Notifications</Link>
        </Button>
      </Box>

      <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
        <IconButton
          color="inherit"
          onClick={handleNotifications}
        >
          <NotificationsIcon />
        </IconButton>
        <Tooltip title="Profile">
          <IconButton
            color="inherit"
            onClick={handleOpenUserMenu}
          >
            <AccountCircleIcon />
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
          style={{ color: 'black' }}
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
              <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
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

export default RiderDashboardHeader
