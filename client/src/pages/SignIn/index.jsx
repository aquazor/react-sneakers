import { SignInPageHelmet } from '../../components/Helmets';
import SignLayout from '../SignLayout';
import SignInForm from './SignInForm';

const SignIn = () => {
  return (
    <SignLayout>
      <SignInPageHelmet />

      <SignInForm />
    </SignLayout>
  );
};

export default SignIn;
