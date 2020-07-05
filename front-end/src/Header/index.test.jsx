import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from './index';

it('El header se renderiza correctamente', () => {
  const tree = renderer
    .create(<Router><Header /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
