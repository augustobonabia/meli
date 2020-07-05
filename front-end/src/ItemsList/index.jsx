import React, { useEffect, useState } from 'react';
import useQuery from '../hooks/useQuery';
import appRoutes from '../core/app-routes';
import Breadcrumb from '../shared-componets/Breadcrumb';
import Item from './Item';
import { searchItems } from '../core/api-utils';
import './index.scss';

function ItemsList() {
  const query = useQuery();
  const searchTerm = query.get(appRoutes.itemsList.params.search);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const updateResults = async () => {
    const results = await searchItems(searchTerm);
    setCategories(results.categories);
    setItems(results.items);
  };

  useEffect(() => { updateResults(searchTerm); }, [searchTerm]);

  const rendeResults = () => {
    console.log('render: ', items);
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
          <Breadcrumb categories={categories} />
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

export default ItemsList;
