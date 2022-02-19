import Transaction from './Transaction';
import { Box } from '@mui/material';
import { useAuthContext } from 'hooks/useAuthContext';
import { useFirestore } from 'hooks/useFirestore';
import CircularProgress from '@mui/material/CircularProgress';
import { useCollection } from 'hooks/useCollection';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 190, sortable: false },
  { field: 'date', headerName: 'Date', width: 120, sortable: false },
  { field: 'transaction', headerName: 'Transaction', width: 130, sortable: false },
  { field: 'amount', headerName: 'Amount ($)', width: 100, sortable: false, type: 'number' },
];

export default function Home() {
  const { user } = useAuthContext();
  const { response, addDocument, deleteDocument } = useFirestore('transactions');
  const { documents, isCollectionPending, collectionError } = useCollection(
    'transactions',
    user.uid
  );
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (documents) {
      const mappedRows = documents.map((doc) => {
        if (doc.createdAt) {
          return {
            id: doc.id,
            date: doc.createdAt.toDate(),
            transaction: doc.transaction,
            amount: doc.amount,
          };
        }
        return doc;
      });
      setRows(mappedRows);
    }
  }, [documents]);

  const deleteRow = (params) => {
    deleteDocument(params.id);
  };

  return (
    <Box>
      {!response.isPending && !isCollectionPending && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <DataGrid
                sx={{ height: 400, width: '100%' }}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sortModel={[{ field: 'date', sort: 'desc' }]}
                onRowDoubleClick={(params) => deleteRow(params)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Transaction uid={user.uid} response={response} addDocument={addDocument} />
            </Grid>
          </Grid>
        </>
      )}
      {(response.isPending || isCollectionPending) && (
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
      {collectionError && (
        <Alert sx={{ mt: 2.5 }} severity='error'>
          {collectionError}
        </Alert>
      )}
    </Box>
  );
}
