import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NavBar from './components/Navbar/NavBar';
import { Container } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container
        maxWidth='md'
        sx={{
          mt: 2.5,
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
