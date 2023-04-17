import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  const [page, setPage] = useState(1);
  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
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
