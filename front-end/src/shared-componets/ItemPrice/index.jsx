import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { sliceByUntilEnd, concatAll } from '../../core/utils';

function Item(props) {
  const { price } = props;

  const amountStr = price.amount.toString();
  const amountSubStrings = sliceByUntilEnd(amountStr, 3).reverse();
  const formattedAmount = concatAll(amountSubStrings, '.');

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

Item.propTypes = {
  price: pricePropType.isRequired,
};

export default Item;
export { pricePropType };
