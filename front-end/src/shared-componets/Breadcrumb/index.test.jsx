import React from 'react';
import Breadcrumb from './index';
import renderer from 'react-test-renderer';

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
