import Transaction from './Transaction';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>other crap</div>
      <Transaction />
    </Box>
  );
}
