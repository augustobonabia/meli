import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './index';
import renderer from 'react-test-renderer';

it('El header se renderiza correctamente', () => {
  const tree = renderer
    .create(<Router><Header /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
