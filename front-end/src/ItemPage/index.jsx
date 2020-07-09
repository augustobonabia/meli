import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, getCancelTokenSource, requestCleaner } from '../core/api-utils';
import Breadcrumb from '../shared-componets/Breadcrumb';
import Item from './Item';

function ItemPage() {
  const source = getCancelTokenSource();
  const { id } = useParams();

  const [state, setState] = useState({
    categories: [],
    item: null,
  });

  const updateItem = async () => {
    const response = await getItem(id);
    setState({
      categories: response.categories,
      item: response.item,
    });
  };

  const renderDetail = (item) => {
    if (item) {
      return <Item item={item} />;
    }

    return null;
  };

  useEffect(() => {
    updateItem();

    return requestCleaner(source);
  }, []);

  return (
    <>
      <div className="page-section">
        <div className="page-section-container">
          <Breadcrumb categories={state.categories} />
        </div>
      </div>
      <div className="page-section">
        {renderDetail(state.item)}
      </div>
    </>
  );
}

export default ItemPage;
