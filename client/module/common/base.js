import { connect as reduxConnect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';
import clsn from 'classnames';

import utils from '@util';

const proxyHook = WrapperComponent =>
  class HOC extends WrapperComponent {
    constructor(props) {
      super(props);
      // inject utilities from util/index.js to instances
      this.$utils = utils;
      this.clsn = clsn;
    }

    setTitle = title => {
      window.document.title = title;
    };

    componentDidMount() {
      // proxy the cdm function of containers then we can modify dom title
      const { title } = WrapperComponent;

      if (title) {
        window.document.title = title;
      }

      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }
  };

/**
 * wrap components with this magic HOC function
 * for some more useful functionalities
 */
function connect(Component) {
  const { fetchInitData, mapState, mapDispatch, form, formProps } = Component;

  const oriCom = Component;

  Component = proxyHook(Component);

  // supply this.props.location... etc.
  let WrapperComponent = withRouter(
    reduxConnect(mapState || (() => ({})), mapDispatch)(Component)
  );

  // if form prop of the container exists, we wrap the container with reduxForm for using `redux-form` functionalities.
  if (form) {
    WrapperComponent = reduxForm({
      form,
      ...formProps
    })(WrapperComponent);

    const selector = formValueSelector(form);

    /* eslint-disable no-param-reassign */
    oriCom.getFormValues = function getFormValues(state, names = []) {
      if (!names.length) {
        return {};
      } else if (names.length === 1) {
        const first = names[0];

        return { [first]: selector(state, first) };
      }
      return selector(state, ...names);
    };
  }

  WrapperComponent.fetchInitData = fetchInitData;

  return WrapperComponent;
}

export default connect;
