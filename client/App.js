import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import { hot } from 'react-hot-loader';

import { Commons } from '@com';

import connect from './module/common/base';

import { routes } from './routes';

import * as style from './style.scss';

class App extends Component {
  static mapState = state => ({
    redirectTo: state.common.redirectTo
  });

  static mapDispatch = {};

  state = { routes };

  render() {
    const { location, redirectTo } = this.props;

    return (
      <div className={style.container}>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Commons />
        <Switch location={location}>
          {this.state.routes.map(({ path, Component: C }) => (
            <Route exact key={path} path={path} component={() => <C />} />
          ))}
        </Switch>
      </div>
    );
  }
}

export default hot(module)(connect(App));
