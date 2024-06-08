import { Navigate } from 'react-router-dom';
import { Slide, Paper, Grid, Box } from '@mui/material';
import { useSelectAuth } from '../hooks/useSelectAuth';
import ToggleTheme from '../components/ToggleTheme';

const SignLayout = ({ children }) => {
  const {
    userAuth: { token },
  } = useSelectAuth();

  if (token) {
    return <Navigate to={'/'} />;
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        position={'relative'}
        overflow={'hidden'}
      >
        <Slide direction="left" in timeout={300}>
          <div>{children}</div>
        </Slide>

        <Box position={'absolute'} top={4} right={4}>
          <ToggleTheme />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignLayout;
