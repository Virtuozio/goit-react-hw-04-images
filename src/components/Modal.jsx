import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlePressESC);
    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  }, []);
  const handlePressESC = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};



Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
