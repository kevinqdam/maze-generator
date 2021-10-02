import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import styles from './styles/Cell.module.scss';

const Cell = function Cell(props) {
  const {
    cell: {
      isActive,
      path,
      visited,
      hasTopWall,
      hasRightWall,
      hasBottomWall,
      hasLeftWall,
    },
    isStart,
    isEnd,
  } = props;

  /* Class names and styles */
  const classNames = [
    isActive ? styles.active : null,
    path ? styles.path : null,
    visited ? styles.visited : null,
    (isStart || isEnd) ? styles.terminal : null,
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
    path: PropTypes.bool,
    visited: PropTypes.bool,
    hasTopWall: PropTypes.bool,
    hasRightWall: PropTypes.bool,
    hasBottomWall: PropTypes.bool,
    hasLeftWall: PropTypes.bool,
  }),
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
};
Cell.defaultProps = {
  cell: PropTypes.shape({
    isActive: false,
    path: false,
    visited: false,
    hasTopWall: true,
    hasRightWall: true,
    hasBottomWall: true,
    hasLeftWall: true,
    isStart: false,
    isEnd: false,
  }),
  isStart: false,
  isEnd: false,
};

export default Cell;
