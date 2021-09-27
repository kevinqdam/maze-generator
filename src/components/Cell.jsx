import React from 'react';
import PropTypes from 'prop-types';

import styles from './Cell.module.scss';

const Cell = function Cell(props) {
  const {
    cell: {
      hasTopWall, hasRightWall, hasBottomWall, hasLeftWall,
    },
  } = props;
  const classNames = [
    styles.cell,
    hasTopWall ? styles['top-wall'] : null,
    hasRightWall ? styles['right-wall'] : null,
    hasBottomWall ? styles['bottom-wall'] : null,
    hasLeftWall ? styles['left-wall'] : null,
  ].filter((className) => (className !== undefined && className !== null));

  return (
    <div className={classNames.join(' ')} />
  );
};
Cell.propTypes = {
  cell: PropTypes.shape({
    hasTopWall: PropTypes.bool,
    hasRightWall: PropTypes.bool,
    hasBottomWall: PropTypes.bool,
    hasLeftWall: PropTypes.bool,
  }),
};
Cell.defaultProps = {
  cell: PropTypes.shape({
    hasTopWall: true,
    hasRightWall: true,
    hasBottomWall: true,
    hasLeftWall: true,
  }),
};

export default Cell;
