import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authContext, useAuth } from '../contexts/AuthContextProvider';

export default function Navbar() {
  const { user, checkAuth, logout } = useAuth();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {user ? (
            <Button
              color="inherit"
              sx={{ color: 'white' }}
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <NavLink to="/login">
                <Button color="inherit" sx={{ color: 'white' }}>
                  Login
                </Button>
              </NavLink>

              <NavLink to="/register">
                <Button color="inherit" sx={{ color: 'white' }}>
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
