import React from 'react';
import PropTypes from 'prop-types';
import { isArray, last, first } from 'lodash';

const Condition = ({ condition, children, multiple }) => {
  // first children of component stands for true result of condition

  const handleCondition = children => {
    if (multiple) {
      if (condition) {
        return children;
      }
    } else {
      if (isArray(children)) {
        if (condition) {
          return first(children);
        } else {
          return last(children);
        }
      } else {
        if (condition) {
          return children;
        }
      }
    }
  };
  return <>{handleCondition(children)}</>;
};

Condition.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node.isRequired || PropTypes.arrayOf(PropTypes.node),
  multiple: PropTypes.bool
};

Condition.defaultProps = {
  multiple: false
};

export default Condition;
