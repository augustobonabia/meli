import React from 'react';
import PropTypes from 'prop-types';
import ItemPrice, { pricePropType } from '../shared-componets/ItemPrice';
import './index.scss';

function Item(props) {
  const { item } = props;
  let status = '';
  if (item.condition === 'new') {
    status = 'Nuevo';
  } else if (item.condition === 'used') {
    status = 'Usado';
  }

  if (status) {
    status += ' - ';
  }
  status += `${item.sold_quantity} vendidos`;

  return (
    <div className="page-section-container item-details-container">
      <div className="grid">
        <article name={item.id} alt={item.title}>
          <img alt="Imagen del producto" src={item.picture} />
          <section className="product-description">
            <h1>Descripción del producto</h1>
            <p>{item.description}</p>
          </section>
        </article>
        <aside name="buy info">
          <section className="status">{status}</section>
          <h1>{item.title}</h1>
          <ItemPrice price={item.price} />
          <button type="button" className="buy">Comprar</button>
        </aside>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: pricePropType,
    picture: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    free_shipping: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    sold_quantity: PropTypes.number.isRequired,
    location: PropTypes.string,
  }).isRequired,
};

export default Item;
