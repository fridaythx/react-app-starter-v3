import React, { Component } from 'react';
import connect from '@module/common/base';
import { navTo } from './action';

import style from './style.scss';

class Container extends Component {
  static mapState = state => ({});
  static mapDispatch = {
    navTo
  };

  navTo = path => () => {
    this.props.navTo(path);
  };

  render() {
    return <div className={style.container} />;
  }
}

export default connect(Container);
