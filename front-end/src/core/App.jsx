import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import './app.scss';
import appRoutes from './app-routes';
import Header from '../Header';
import ItemsListPage from '../ItemsListPage';
import ItemPage from '../ItemPage';
import ErrorBoundary from '../shared-componets/ErrorBoundary';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <Switch>
        <ErrorBoundary key={location.path}>
          <Route exact path={appRoutes.searchBox.path} />
          <Route exact path={appRoutes.itemsList.path}>
            <ItemsListPage />
          </Route>
          <Route path={appRoutes.itemDetail.path}>
            <ItemPage />
          </Route>
          <Route path="*">
            <Redirect to={appRoutes.searchBox.path} />
          </Route>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default hot(module)(App);
