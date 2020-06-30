import React from 'react';
import SearchBar from './SearchBar';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="page-container">
        <div className="logo-container">
          <img className="logo" alt="logo" src="../logo.png" />
        </div>
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
