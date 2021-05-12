import React from 'react';
import PropTypes from 'prop-types';
import './point.scss';

Point.propTypes = {
  handleClick: PropTypes.func
};

function Point({handleClick}) {
  return (
    <button className="carousel__point" onClick={handleClick}/>
  );
}

export default Point;
