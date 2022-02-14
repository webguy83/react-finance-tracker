import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 48,
      marginBottom: 20,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 20,
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#33691e',
    },
    secondary: {
      main: '#5d4037',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
