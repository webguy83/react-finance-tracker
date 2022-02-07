import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  function onInputChange(e) {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        setPassword(e.target.value);
        break;
    }
  }

  function loginSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <Box
      component='form'
      onSubmit={(e) => loginSubmit(e)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h1'>Login</Typography>
      {!isPending && (
        <>
          <TextField
            id='email'
            label='Email'
            variant='outlined'
            onChange={(e) => onInputChange(e)}
            value={email}
            required
          />
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            inputProps={{
              type: 'password',
            }}
            value={password}
            onChange={(e) => onInputChange(e)}
            required
          />
          <Button type='submit' variant='contained'>
            Login
          </Button>
        </>
      )}
      {isPending && <CircularProgress />}
      {error && (
        <Alert sx={{ mt: 2.5 }} severity='error'>
          {error}
        </Alert>
      )}
    </Box>
  );
}
