import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import useQuery from '../hooks/useQuery';
import appRoutes from '../core/app-routes';
import Breadcrumb from '../shared-componets/Breadcrumb';
import Item from './Item';
import './index.scss';

const search = async (searchTerm) => {
  const response = await Axios.get(`/api/items?q=${searchTerm}`);
  const results = response.data;

  return {
    author: results.author,
    categories: results.categories,
    items: results.items,
  };
};

function ItemsList() {
  const query = useQuery();
  const searchTerm = query.get(appRoutes.itemsList.params.search);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const updateResults = async () => {
    const results = await search(searchTerm);
    setCategories(results.categories);
    setItems(results.items);
  };

  useEffect(() => { updateResults(searchTerm); }, [searchTerm]);

  return (
    <>
      <div className="page-section">
        <div className="page-section-container">
          <Breadcrumb categories={categories} />
        </div>
      </div>
      <div className="page-section">
        <ul className="page-section-container items-list">
          {
            items.map((item) => (
              <Item key={item.id} item={item} />
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default ItemsList;
