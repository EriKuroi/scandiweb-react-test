import React from 'react';
import PropTypes from 'prop-types';
import './frame.scss';

const Frame = ({frameHtml, refFrame}) => {
  return (
    <div
      className="frame"
      ref={refFrame}
    >
      <div className="frame__inner">
        {frameHtml}
      </div>
    </div>
  );
};

Frame.propTypes = {
  frameHtml: PropTypes.element,
  getWidth: PropTypes.func,
};
Frame.defaultProps = {
  frameHtml: <div/>,
  getWidth: ()=>{console.error('Function getWidth not provided')},
};
export default Frame;
