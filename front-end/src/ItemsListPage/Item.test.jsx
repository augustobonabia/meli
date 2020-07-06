import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Item from './Item';

it('Un item del listado de búsqueda se renderiza correctamente', () => {
  const item = {
    id: 'MLA123',
    title: 'Mesa de ping pong',
    price: {
      amount: 34999,
      decimals: 99,
      currency: '$',
    },
    picture: 'una-imagen.png',
    condition: 'new',
    free_shipping: true,
    location: 'Capital Federal',
  };

  const tree = renderer
    .create(<Router><Item item={item} /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
