import ContentLoader from 'react-content-loader';

const SneakersCardLoader = () => {
  return (
    <ContentLoader
      speed={1}
      width={210}
      height={282}
      viewBox="0 0 210 282"
      backgroundColor="#e0e0e0"
      foregroundColor="#ffffff"
    >
      <rect x="36" y="16" rx="5" ry="5" width="130" height="120" />
      <rect x="16" y="152" rx="5" ry="5" width="178" height="20" />
      <rect x="16" y="188" rx="5" ry="5" width="50" height="20" />
      <rect x="16" y="226" rx="5" ry="5" width="90" height="20" />
      <rect x="154" y="196" rx="5" ry="5" width="36" height="36" />
    </ContentLoader>
  );
};

export default SneakersCardLoader;
