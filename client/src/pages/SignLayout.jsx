import { Navigate } from 'react-router-dom';
import { Slide, Paper, Grid, Box } from '@mui/material';
import { useSelectAuth } from '../hooks/useSelectAuth';
import { GoHomeLink, ToggleTheme } from '../components';

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
          backgroundImage:
            'url(https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
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
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={1}
          p={1}
          borderRadius={20}
        >
          <GoHomeLink />

          <ToggleTheme />
        </Box>

        <Slide direction="left" in timeout={300}>
          <div>{children}</div>
        </Slide>
      </Grid>
    </Grid>
  );
};

export default SignLayout;
