import { Helmet } from 'react-helmet';

const ItemPageHelmet = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default ItemPageHelmet;
