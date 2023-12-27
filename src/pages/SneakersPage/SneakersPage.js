import '../Page.scss';
import { useMemo, useState } from 'react';
import { useSneakersContext } from '../../context';
import { Input, SectionHeader, SneakersList } from '../../components';

const SneakersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { sneakersItems, isLoadingSneakers, errorLoadingSneakers } = useSneakersContext();

  const heading = useMemo(
    () => <h1>{searchTerm ? `Поиск по запросу: "${searchTerm}"` : 'Все кроссовки'}</h1>,
    [searchTerm]
  );

  return (
    <section className="section section__padding">
      <SectionHeader heading={heading}>
        <Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </SectionHeader>

      <div className="section__content">
        <SneakersList
          data={sneakersItems}
          isLoading={isLoadingSneakers}
          error={errorLoadingSneakers}
          searchTerm={searchTerm}
        />
      </div>
    </section>
  );
};

export default SneakersPage;
