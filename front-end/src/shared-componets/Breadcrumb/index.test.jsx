import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from './index';

it('El breadcrumb se renderiza correctamente', () => {
  const categories = [
    'Animales y Mascotas',
    'Perros',
    'Perros de Raza',
  ];

  const tree = renderer
    .create(<Breadcrumb categories={categories} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
