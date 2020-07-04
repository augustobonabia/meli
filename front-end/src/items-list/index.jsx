import React, { useEffect } from 'react';
import Axios from 'axios';
import useQuery from '../hooks/useQuery';
import appRoutes from '../core/app-routes';

function ItemsList() {
  const query = useQuery();
  const searchTerm = query.get(appRoutes.itemsList.params.search);
  let items = [];

  const getItems = () => {
    Axios.get(`/api/items?q=${searchTerm}`).then((response) => {
      items = response.data;
    });
  };
  
  useEffect(() => {
    getItems();
  }, []);


  console.log(items);

  return (
    <div>cambiar por HTML5</div>
  );
}

export default ItemsList;
