import Transaction from './Transaction';
import { Box } from '@mui/material';
import { useAuthContext } from 'hooks/useAuthContext';
import { useFirestore } from 'hooks/useFirestore';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const { user } = useAuthContext();
  const { response, addDocument } = useFirestore('transactions');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {!response.isPending && (
        <>
          <div>other crap</div>
          <Transaction uid={user.uid} response={response} addDocument={addDocument} />
        </>
      )}
      {response.isPending && (
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
    </Box>
  );
}
