import { SignUpPageHelmet } from '../../components/Helmets';
import SignLayout from '../SignLayout';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <SignLayout>
      <SignUpPageHelmet />

      <SignUpForm />
    </SignLayout>
  );
};

export default SignUp;
