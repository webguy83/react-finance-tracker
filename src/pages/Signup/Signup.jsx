import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { isPending, error, signup } = useSignup();

  function onInputChange(e) {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'displayName':
        setDisplayName(e.target.value);
        break;
      default:
        setPassword(e.target.value);
        break;
    }
  }

  function signupSubmit(e) {
    e.preventDefault();
    signup(email, password, displayName);
  }

  return (
    <Box
      component='form'
      onSubmit={(e) => signupSubmit(e)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h1'>Sign Up</Typography>
      {!isPending && (
        <>
          <TextField
            id='email'
            label='Email'
            variant='outlined'
            onChange={(e) => onInputChange(e)}
            value={email}
            inputProps={{
              type: 'email',
            }}
            required
          />
          <TextField
            id='displayName'
            label='Display Name'
            variant='outlined'
            onChange={(e) => onInputChange(e)}
            value={displayName}
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
            Sign Up
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
