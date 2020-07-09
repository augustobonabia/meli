import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { formatPriceAmount } from '../../core/utils';

function ItemPrice(props) {
  const { price } = props;

  if (!price) {
    return null;
  }

  const formattedAmount = formatPriceAmount(price.amount);

  const renderCents = (decimals) => {
    if (decimals) {
      return <span className="cents">{decimals}</span>;
    }

    return null;
  };

  return (
    <span alt="Precio" className="price">
      <span alt="Moneda" className="currency">{price.currency}</span>
      <span alt="Monto" className="amount">{formattedAmount}</span>
      {renderCents(price.decimals)}
    </span>
  );
}

const pricePropType = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  decimals: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
});

ItemPrice.propTypes = {
  price: pricePropType,
};

ItemPrice.defaultProps = {
  price: null,
};

export default ItemPrice;
export { pricePropType };
