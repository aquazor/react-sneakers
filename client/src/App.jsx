import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useThemeContext } from './theme/useThemeContext';
import { Layout, Home, Cart, SignIn, SignUp } from './pages';

const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
