import React, { useState, useEffect } from 'react';
import {
  withRouter,
  useLocation,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import appRoutes from '../core/app-routes';

function SearchBar() {
  const location = useLocation();
  const history = useHistory();
  const query = (new URLSearchParams(location.search));

  const matchSearchBox = useRouteMatch({
    path: appRoutes.searchBox.path,
    exact: true,
    strict: true,
  });

  const matchItemsList = useRouteMatch({
    path: appRoutes.itemsList.path,
    exact: true,
    strict: true,
  });

  const [value, setValue] = useState('');

  /** Hook para realizar una búsqueda en base a la URL */
  useEffect(() => {
    if (matchSearchBox) {
      setValue('');
    } else if (matchItemsList) {
      const newValue = query.get(appRoutes.itemsList.params.search);
      setValue(newValue);
    }
  }, [location]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  /**
   * Redirije la aplicación al listado de búsqueda pasándole su parámetro de búsqueda.
   * Si no hay ningún valor de búsqueda se redirije a la vista de la caja de búsqueda
   */
  function handleSubmit(event) {
    event.preventDefault();

    let newPath;
    if (value) {
      const itemsRoute = appRoutes.itemsList;
      newPath = `${itemsRoute.path}?${itemsRoute.params.search}=${value}`;
    } else {
      newPath = `${appRoutes.searchBox.path}`;
    }
    history.push(newPath);
  }

  return (
    <form name="searchForm" className="search-form" onSubmit={handleSubmit}>
      <input
        name="search"
        className="search-box"
        type="text"
        value={value}
        onChange={handleChange}
        size="1"
        placeholder="Nunca dejes de buscar"
        aria-label="Ingresá tu búsqueda"
      />
      <button type="submit" value="Submit" className="search-button">
        <img alt="searchIcon" src="./search.png" />
      </button>
    </form>
  );
}

export default withRouter(SearchBar);
