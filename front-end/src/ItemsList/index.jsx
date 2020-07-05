import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import useQuery from '../hooks/useQuery';
import appRoutes from '../core/app-routes';
import Breadcrumb from '../shared-componets/Breadcrumb';

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
  let items = [];

  const updateResults = async () => {
    const results = await search(searchTerm);
    setCategories(results.categories);
    
    items = results.items;
  };

  useEffect(() => { updateResults(searchTerm); }, [searchTerm]);

  return (
    <div className="page">
      <div className="page-container">
        <Breadcrumb categories={categories} />
      </div>
    </div>
  );
}

export default ItemsList;
