import React, { useEffect, useState } from 'react';
import useQuery from '../hooks/useQuery';
import appRoutes from '../core/app-routes';
import Breadcrumb from '../shared-componets/Breadcrumb';
import Item from './Item';
import { searchItems, getCancelTokenSource, requestCleaner } from '../core/api-utils';
import './index.scss';

function ItemsListPage() {
  const source = getCancelTokenSource();
  const query = useQuery();
  const searchTerm = query.get(appRoutes.itemsList.params.search);
  const [listResults, setListResults] = useState({
    categories: [],
    items: [],
    isOutdated: true,
  });

  const updateResults = async () => {
    const results = await searchItems(searchTerm, source);
    setListResults({
      categories: results.categories,
      items: results.items,
      isOutdated: false,
    });
  };

  useEffect(() => {
    updateResults(searchTerm);

    return requestCleaner(source);
  }, [searchTerm]);

  const rendeResults = () => {
    // No renderiza los resultados hasta que no estén actualizados
    if (listResults.isOutdated) {
      return null;
    }

    const { items } = listResults;
    if (items.length) {
      return items.map((item) => (
        <Item key={item.id} item={item} />
      ));
    }

    return <span className="no-results">Lo sentimos, no hemos encontrado lo que buscabas</span>;
  };

  return (
    <>
      <div className="page-section">
        <div className="page-section-container">
          <Breadcrumb categories={listResults.categories} />
        </div>
      </div>
      <div className="page-section">
        <ul className="page-section-container items-list">
          {rendeResults()}
        </ul>
      </div>
    </>
  );
}

export default ItemsListPage;
