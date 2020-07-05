import React from 'react';
import ItemPrice from './index';
import renderer from 'react-test-renderer';

it('El precio se renderiza correctamente', () => {
  const price = {
    amount: 4850,
    decimals: 50,
    currency: '$',
  };

  const tree = renderer
    .create(<ItemPrice price={price} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
