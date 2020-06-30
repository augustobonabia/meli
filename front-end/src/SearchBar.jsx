import React from 'react';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <form name="searchForm" className="search-form">
        <input
          name="search"
          className="search-box"
          type="text"
          size="1"
          placeholder="Nunca dejes de buscar"
          aria-label="Ingresá tu búsqueda"
        />
        <button type="submit" className="search-button">
          <img alt="searchIcon" src="./search.png" />
        </button>
      </form>
    );
  }
}

export default SearchBar;
