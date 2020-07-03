import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import './app.scss';
import Header from '../header';
import appRoutes from './app-routes';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path={appRoutes.searchBox.path} />
        <Route exact path={appRoutes.itemsList.path}>
          <Items />
        </Route>
        <Route path={appRoutes.itemDetail.path}>
          <Item />
        </Route>
        <Route path="*">
          <div className="page-container">404</div>
        </Route>
      </Switch>
    </div>
  );
}

function Items() {
  return (
    <div className="page-container">
      Items
    </div>
  );
}

function Item() {
  return (
    <div className="page-container">
      Item
    </div>
  );
}

export default hot(module)(App);
