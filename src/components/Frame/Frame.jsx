import React from 'react';
import './frame.scss';
import PropTypes from 'prop-types';

const Frame = ({ frameHtml }) => {
  return (
    <div
      className="frame"
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
