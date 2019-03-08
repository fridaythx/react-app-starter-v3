import React, { Component } from 'react';
import connect from '@module/common/base';
import style from './style.scss';

class Container extends Component {
  componentDidMount() {}

  render() {
    return <div className={style.container}>It works!</div>;
  }
}

export default connect(Container);
