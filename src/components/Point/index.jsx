import React from 'react';
import PropTypes from 'prop-types';
import './point.scss';

function Point({handleClick, active, index}) {
  const handlePointClick = (event) =>{
    event.target.blur();
    handleClick(index)
  }
  return (
    <button className={active ? "carousel__point carousel__point--active" : "carousel__point"} onClick={handlePointClick}/>
  )
}

Point.propTypes = {
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  index: PropTypes.number.isRequired,
};
Point.defaultProps = {
  handleClick: ()=>{console.error('No handler provided')},
  active: false,
}
export default Point;
