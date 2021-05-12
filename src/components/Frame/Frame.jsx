import React from 'react';
import './frame.scss';
import PropTypes from 'prop-types';

const Frame = ({ frameHtml }) => {
  console.log('drogglejug');
  return (
    <div
      className="frame"
      onDrag={handleDragging}
    >
      <div className="frame__inner">
        {frameHtml}
      </div>
    </div>
  );
};

Frame.propTypes = {
  frameHtml: PropTypes.element,
};
Frame.defaultProps = {
  frameHtml: <div />,
};
export default Frame;
