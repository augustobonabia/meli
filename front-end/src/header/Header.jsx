import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './header.scss';

function Header() {
  return (
    <header className="header">
      <div className="page-container">
        <div className="logo-container">
          <Link to="/">
            <img className="logo" alt="logo" src="../logo.png" />
          </Link>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
