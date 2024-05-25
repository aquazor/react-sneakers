import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { register as registerUser } from '../../redux/thunks/authThunks';

const schema = z
  .object({
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
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Passwords must match.',
    path: ['password_confirm'],
  });

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();

      navigate('/sign-in');
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
        Sign up
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

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password_confirm"
              label="Confirm Password"
              type="password"
              id="password_confirm"
              autoComplete="new-password"
              {...register('password_confirm')}
              error={Boolean(errors.password_confirm)}
              helperText={errors.password_confirm && errors.password_confirm.message}
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
          Sign Up
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
            <Link component={RouterLink} to="/sign-in">
              {'Already have an account? Sign in'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;
