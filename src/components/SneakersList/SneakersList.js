import './SneakersList.scss';
import { SneakersListItem, CardSkeleton } from '../../components';
import { useCallback } from 'react';

const SneakersList = ({ data, isLoading, error, searchTerm }) => {
  const renderItems = useCallback(() => {
    if (isLoading) {
      return [...Array(8)].map((_, index) => (
        <CardSkeleton className={'sneakers__card'} key={index} />
      ));
    }

    if (error) {
      return error;
    }

    let items = data;

    if (searchTerm) {
      items = data?.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items.map((item) => <SneakersListItem key={item.id} item={item} />);
  }, [data, isLoading, error, searchTerm]);

  const renderedItems = renderItems();

  return (
    <ul className="section__content-items">
      {renderedItems.length ? renderedItems : 'Тут пока пусто...'}
    </ul>
  );
};

export default SneakersList;
