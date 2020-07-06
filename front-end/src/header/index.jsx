import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearchBar from './HeaderSearchBar';
import './index.scss';

function Header() {
  return (
    <header className="page-section header">
      <div className="page-section-container">
        <div className="logo-container">
          <Link to="/">
            <img className="logo" alt="logo" src="./logo.png" />
          </Link>
        </div>
        <HeaderSearchBar />
      </div>
    </header>
  );
}

export default Header;
