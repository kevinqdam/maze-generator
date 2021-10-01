import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import styles from './Cell.module.scss';

const Cell = function Cell(props) {
  const {
    cell: {
      isActive, hasTopWall, hasRightWall, hasBottomWall, hasLeftWall,
    },
  } = props;

  /* Class names and styles */
  const classNames = [
    isActive ? styles.active : null,
    hasTopWall ? styles['top-wall'] : null,
    hasRightWall ? styles['right-wall'] : null,
    hasBottomWall ? styles['bottom-wall'] : null,
    hasLeftWall ? styles['left-wall'] : null,
  ].filter((className) => (!isNil(className)));

  return (
    <div className={classNames.join(' ')} />
  );
};
Cell.propTypes = {
  cell: PropTypes.shape({
    isActive: PropTypes.bool,
    hasTopWall: PropTypes.bool,
    hasRightWall: PropTypes.bool,
    hasBottomWall: PropTypes.bool,
    hasLeftWall: PropTypes.bool,
  }),
};
Cell.defaultProps = {
  cell: PropTypes.shape({
    isActive: false,
    hasTopWall: true,
    hasRightWall: true,
    hasBottomWall: true,
    hasLeftWall: true,
  }),
};

export default Cell;
