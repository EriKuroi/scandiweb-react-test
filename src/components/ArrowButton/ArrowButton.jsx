import React from 'react';
import './arrowButton.scss';
import PropTypes from 'prop-types';

const ArrowButton = ({direction, handleClick}) => {
  return (
    <button
      onClick={handleClick}
      className={direction === 'right' ? "arrow-button__wrapper arrow-button__wrapper--right" : "arrow-button__wrapper arrow-button__wrapper--left"}>
      {direction === 'right' ? '>' : '<'}
    </button>
  );
};

ArrowButton.propTypes = {
  direction: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ArrowButton;
