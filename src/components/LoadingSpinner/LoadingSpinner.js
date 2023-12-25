import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = (props) => {
  return (
    <RotatingLines
      visible={true}
      height="32"
      width="32"
      color="#yellow"
      strokeWidth="4"
      animationDuration="0.5"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
      {...props}
    />
  );
};

export default LoadingSpinner;
