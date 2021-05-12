import React from 'react';
import PropTypes from 'prop-types';
import './point.scss';

Point.propTypes = {
  handleClick: PropTypes.func,
  active: PropTypes.bool,
};

function Point({handleClick, active, index}) {
  const handlePointClick = () =>{
    handleClick(index)
  }
  return (
    <button className={active ? "carousel__point carousel__point--active" : "carousel__point"} onClick={handlePointClick}/>
  )
}

export default Point;
