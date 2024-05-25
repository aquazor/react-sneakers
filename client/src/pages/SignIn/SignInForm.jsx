import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Link,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { PASSWORD_REGEX } from '../../constants';
import { login } from '../../redux/thunks/authThunks';

const schema = z.object({
  email: z
    .string()
    .email('Invalid email.')
    .max(255, 'Email must me maximum 255 characters.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(20, 'Password must be maximum 20 characters long.')
    .regex(
      PASSWORD_REGEX,
      'Password must contain one uppercase, one lowercase, one number and no special characters.'
    ),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();

      navigate(from);
    } catch (error) {
      setError('root', { message: error.message });
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box component="form" width={1} noValidate onSubmit={handleSubmit(onSubmit)} mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register('password')}
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
            />
          </Grid>
        </Grid>

        {errors.root && (
          <Typography mt={1} component="p" variant="body1" color="error">
            {errors.root.message}
          </Typography>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
          {isSubmitting && (
            <CircularProgress
              thickness={4}
              sx={{ position: 'absolute', right: 10 }}
              color="inherit"
              size={24}
            />
          )}
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/sign-up">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignInForm;
