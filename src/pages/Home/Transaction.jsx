import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';

import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { InputBase, InputLabel, Paper } from '@mui/material';

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

export default function Transaction({ uid, addDocument, response }) {
  const [transName, setTransName] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      amount,
      transaction: transName,
    });
  };

  useEffect(() => {
    if (response.document) {
      setTransName('');
      setAmount('');
    }
  }, [response.document]);

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
