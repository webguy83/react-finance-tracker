import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NavBar from './components/Navbar/NavBar';
import Container from '@mui/material/Container';
import { useAuthContext } from './hooks/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      <CssBaseline />
      {authIsReady && (
        <BrowserRouter>
          <NavBar />
          <Container
            maxWidth='lg'
            sx={{
              mt: 2.5,
            }}
          >
            <Routes>
              <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
            </Routes>
          </Container>
        </BrowserRouter>
      )}
      {!authIsReady && (
        <CircularProgress
          size={100}
          thickness={5}
          sx={{
            position: 'absolute',
            top: 'calc(50% - 50px)',
            left: 'calc(50% - 50px)',
          }}
        />
      )}
    </>
  );
}
