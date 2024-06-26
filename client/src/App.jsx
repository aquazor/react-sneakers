import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useThemeContext } from './theme/useThemeContext';
import { DefaultHelmet } from './components/Helmets';
import {
  Layout,
  Home,
  Cart,
  SignIn,
  SignUp,
  Item,
  NotFound,
  SecondaryLayout,
} from './pages';

const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <DefaultHelmet />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<SecondaryLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sneakers" element={<Item />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
