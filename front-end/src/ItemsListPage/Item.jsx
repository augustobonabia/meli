import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemPrice, { pricePropType } from '../shared-componets/ItemPrice';

function Item(props) {
  const { item } = props;

  const renderFreeShipping = (hasFreeShipping) => {
    if (hasFreeShipping) {
      return <img className="free-shipping" alt="¡Envío gratis!" src="./shipping.png" />;
    }

    return null;
  };

  return (
    <li className="item-container">
      <Link to={`/items/${item.id}`}>
        <article alt="Producto" className="item">
          <img className="thumbnail" alt="Pequeña imagen del producto" src={item.picture} />
          <div className="item-content">
            <section alt="Información principal" className="abstract">
              <div className="price-and-shipping">
                <ItemPrice price={item.price} />
                {renderFreeShipping(item.free_shipping)}
              </div>
              <h1 alt="Título">{item.title}</h1>
            </section>
            <section alt="Información adicional" className="additional-info">
              <span alt="Ubicación del vendedor">{item.location}</span>
            </section>
          </div>
        </article>
      </Link>
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: pricePropType,
    picture: PropTypes.string.isRequired,
    condition: PropTypes.string,
    free_shipping: PropTypes.bool.isRequired,
    location: PropTypes.string,
  }).isRequired,
};

export default Item;
