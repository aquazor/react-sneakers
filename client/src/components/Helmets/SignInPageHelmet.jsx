import { Helmet } from 'react-helmet';

const SignInPageHelmet = () => {
  return (
    <Helmet>
      <title>Sign In | React Sneakers</title>
      <meta
        name="description"
        content="Sign in to your account to access your cart and orders. Secure and easy login for a seamless shopping experience."
      />
    </Helmet>
  );
};

export default SignInPageHelmet;
