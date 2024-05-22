import { Helmet } from 'react-helmet';

const DefaultHelmet = () => {
  return (
    <Helmet>
      <title>React Sneakers</title>
      <meta
        name="keywords"
        content="sneakers, snickers, sneaker shop, buy sneakers online, authentic sneakers"
      />
      <meta
        property="og:title"
        content="React Sneakers - Buy Authentic Sneakers Online"
      />
      <meta
        property="og:description"
        content="Shop authentic sneakers from top brands at React Sneakers. Get the latest sneaker releases and restocks online."
      />
      <meta property="og:url" content="https://react-sneakers-pdbf.onrender.com/" />
      <meta name="author" content="React Sneakers" />
    </Helmet>
  );
};

export default DefaultHelmet;
