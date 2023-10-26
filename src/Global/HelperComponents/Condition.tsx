import React, { FC, ReactNode } from 'react';
import { isArray, last, first } from 'lodash';

interface ConditionProps {
  condition: Boolean;
  children:ReactNode;
  multiple?:Boolean;
}
const Condition:FC<ConditionProps>= ({ condition, children, multiple }) => {
  const handleCondition = (children: ReactNode | ReactNode[]) => {
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

Condition.defaultProps = {
  multiple: false
};

export default Condition;
