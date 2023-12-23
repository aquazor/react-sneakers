import { useState } from 'react';
import { useSneakersContext } from '../../context';
import { Section } from '../../components';

const SneakersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { sneakersItems } = useSneakersContext();

  const heading = searchTerm ? `Поиск по запросу: "${searchTerm}"` : 'Все кроссовки';

  return (
    <Section items={sneakersItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <h1>{heading}</h1>
    </Section>
  );
};

export default SneakersPage;
