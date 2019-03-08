import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '@module/common/base';

import { setCommonState } from '@module/common/action';

class Commons extends PureComponent {
  static mapDispatch = {
    setCommonState
  };

  render() {
    return <div />;
  }
}

Commons.propTypes = {};

Commons.defaultProps = {
  setCommonState: () => {}
};

export default connect(Commons);
