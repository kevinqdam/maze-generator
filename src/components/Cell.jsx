import React from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

const Cell = function Cell(props) {
  const {
    hasTopWall, hasRightWall, hasBottomWall, hasLeftWall, cellSideLengthInPx
  } = props;
  const classNames = [
    'cell',
    hasTopWall ? 'top-wall' : '',
    hasRightWall ? 'right-wall' : '',
    hasBottomWall ? 'bottom-wall' : '',
    hasLeftWall ? 'left-wall' : '',
  ].filter((className) => className.length > 0);

  return (
    <div className={classNames.join(' ')} />
  );
};
Cell.propTypes = {
  hasTopWall: PropTypes.bool,
  hasRightWall: PropTypes.bool,
  hasBottomWall: PropTypes.bool,
  hasLeftWall: PropTypes.bool,
  cellSideLengthInPx: PropTypes.number,
};
Cell.defaultProps = {
  hasTopWall: true,
  hasRightWall: true,
  hasBottomWall: true,
  hasLeftWall: true,
  cellSideLengthInPx: 10,
};

export default Cell;
