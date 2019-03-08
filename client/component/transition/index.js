import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import * as style from './style.scss';

const Transition = props => (
  <div className={style.container}>
    <TransitionGroup component={null}>
      <CSSTransition
        key={props.transitionkey}
        classNames="fade-in"
        timeout={props.timeout}
      >
        <div className={style.wrap}>{props.children}</div>
      </CSSTransition>
    </TransitionGroup>
  </div>
);

Transition.defaultProps = {
  timeout: 300
};

Transition.propTypes = {
  transitionkey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  timeout: PropTypes.number
};

export default Transition;
