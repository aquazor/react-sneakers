import ContentLoader from 'react-content-loader';

const CardSkeleton = ({ className, ...rest }) => {
  return (
    <li className={className}>
      <ContentLoader
        speed={1}
        width={150}
        height={208}
        viewBox="0 0 150 208"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...rest}
      >
        <rect x="0" y="0" rx="5" ry="5" width="150" height="100" />
        <rect x="0" y="110" rx="5" ry="5" width="150" height="20" />
        <rect x="0" y="135" rx="5" ry="5" width="100" height="20" />
        <rect x="0" y="176" rx="5" ry="5" width="80" height="30" />
        <rect x="109" y="166" rx="10" ry="10" width="40" height="40" />
      </ContentLoader>
    </li>
  );
};

export default CardSkeleton;
