import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import './app.scss';
import appRoutes from './app-routes';
import Header from '../Header';
import ItemsListPage from '../ItemsListPage';
import ItemPage from '../ItemPage';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path={appRoutes.searchBox.path} />
        <Route exact path={appRoutes.itemsList.path}>
          <ItemsListPage />
        </Route>
        <Route path={appRoutes.itemDetail.path}>
          <ItemPage />
        </Route>
        <Route path="*">
          <div className="page-container">404</div>
        </Route>
      </Switch>
    </div>
  );
}

export default hot(module)(App);
