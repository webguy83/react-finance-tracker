import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, InputBase, InputLabel, Paper, ThemeProvider } from '@mui/material';

const newTheme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});

const MyInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  fontFamily: 'Caveat, cursive',
  fontWeight: 700,
}));

const BackGroundPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderRadius: theme.spacing(2),
  maxWidth: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'palette.main',
}));

export default function Transaction() {
  const [transName, setTransName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  const addTransaction = (e) => {
    e.preventDefault();
    console.log(date);
    console.log(amount, transName, date);
  };

  return (
    <BackGroundPaper elevation={8} onSubmit={(e) => addTransaction(e)}>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          width: '100%',
          padding: '20px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel sx={{ color: 'common.white', mb: 0.5 }} htmlFor='trans-name'>
            Transaction name:
          </InputLabel>
          <MyInput
            type='text'
            id='trans-name'
            name='trans-name'
            onChange={(e) => setTransName(e.target.value)}
            value={transName}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
          <InputLabel sx={{ color: 'common.white', mb: 0.5 }} htmlFor='amount'>
            Amount ($):
          </InputLabel>
          <MyInput
            type='number'
            id='amount'
            name='amount'
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </Box>
        <ThemeProvider theme={newTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Basic example'
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2.5,
                  }}
                >
                  <input style={{ width: '100%' }} ref={inputRef} {...inputProps} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </ThemeProvider>
        <Button
          variant='contained'
          size='medium'
          color='warning'
          type='submit'
          startIcon={<PaidIcon />}
          sx={{ mt: 2 }}
        >
          Add Transaction
        </Button>
      </Box>
    </BackGroundPaper>
  );
}
