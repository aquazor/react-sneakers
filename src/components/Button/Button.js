import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Button = ({ children, className, loading, ...rest }) => {
  return (
    <button type="button" disabled={loading} className={className} {...rest}>
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
