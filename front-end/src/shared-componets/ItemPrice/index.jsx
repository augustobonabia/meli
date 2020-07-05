import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Item(props) {
  const { price } = props;

  const renderCents = (decimals) => {
    if (decimals) {
      return <span className="cents">{decimals}</span>;
    }

    return null;
  };

  return (
    <span alt="Precio" className="price">
      <span alt="Moneda" className="currency">{price.currency}</span>
      <span alt="Monto" className="amount">{price.amount}</span>
      {renderCents(price.decimals)}
    </span>
  );
}

const pricePropType = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  decimals: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
});

Item.propTypes = {
  price: pricePropType.isRequired,
};

export default Item;
export { pricePropType };
