import React from 'react';
import PropTypes, { string } from 'prop-types';
import './index.scss';

function Breadcrumb(props) {
  const { categories } = props;

  const renderSeparator = (categoryIndex) => {
    if (categoryIndex) {
      return <span className="separator">{'>'}</span>;
    }

    return null;
  };

  const renderCategoryName = (categoryName, categoryIndex) => {
    let className = 'category-name';

    if (categoryIndex + 1 === categories.length) {
      className += ' last-in-path';
    }

    return <span className={className}>{categoryName}</span>;
  };

  return (
    <nav className="breadcrumb">
      {
        categories.map((category, categoryIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={categoryIndex}>
            {renderSeparator(categoryIndex)}
            {renderCategoryName(category, categoryIndex)}
          </span>
        ))
      }
    </nav>
  );
}

Breadcrumb.propTypes = {
  categories: PropTypes.arrayOf(string).isRequired,
};

export default Breadcrumb;
