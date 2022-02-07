import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

const pages = ['Signup', 'Login'];

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goToPage = (page) => {
    navigate(`/${page}`);
    setAnchorElNav(null);
  };

  const onHomeBtnClick = () => {
    navigate('/');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          onClick={onHomeBtnClick}
          sx={{ mr: 2, display: { xs: 'none', md: 'block', color: 'white' } }}
        >
          <AccountBalanceIcon fontSize='large' />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
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
            }}
          >
            {!user &&
              pages.map((page) => (
                <MenuItem key={page} onClick={() => goToPage(page)}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            {user && (
              <MenuItem onClick={logout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
        <IconButton
          onClick={onHomeBtnClick}
          sx={{ mr: 2, display: { xs: 'block', md: 'none', color: 'white' } }}
        >
          <AccountBalanceIcon fontSize='large' />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {!user &&
            pages.map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          {user && (
            <Button onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>
              Logout
            </Button>
          )}
          {user && (
            <Typography
              variant='subtitle1'
              component='div'
              sx={{
                ml: 'auto',
                alignSelf: 'center',
              }}
            >
              Greetings, {user.displayName}!
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
