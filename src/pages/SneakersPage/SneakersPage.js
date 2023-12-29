import { useMemo, useState } from 'react';
import { useSneakersContext } from '../../context';
import { Input, SectionHeader, SneakersList, SearchPopup } from '../../components';

const SneakersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { sneakersItems, isLoadingSneakers, errorLoadingSneakers } = useSneakersContext();

  const heading = useMemo(() => <h1>Все кроссовки</h1>, []);

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

      <SearchPopup searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </section>
  );
};

export default SneakersPage;
