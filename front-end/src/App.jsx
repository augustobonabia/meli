import React from 'react';
import { hot } from 'react-hot-loader';
import './App.scss';
import Header from './Header';

function App() {
  return (
    <div className="app">
      <Header />
    </div>
  );
}

export default hot(module)(App);
