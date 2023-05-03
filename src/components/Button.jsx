import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ page, onLoadMore }) => {
  const handleClick = () => {
    onLoadMore(page + 1);
  };
  return (
    <button className="Button" onClick={handleClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
