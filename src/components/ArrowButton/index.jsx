import React from 'react';
import PropTypes from 'prop-types';
import './arrowButton.scss';

const ArrowButton = ({direction, handleClick}) => {
  return (
    <button
      onClick={handleClick}
      className={`arrow-button__wrapper arrow-button__wrapper--${direction}`}>
      {direction === 'right' ? '>' : '<'}
    </button>
  );
};

ArrowButton.propTypes = {
  direction: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
ArrowButton.defaultProps = {
  handleClick: () => {console.error('No provided handleClick function')},
}
export default ArrowButton;
