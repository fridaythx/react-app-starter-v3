import React, { Component } from 'react';
import * as PT from 'prop-types';
import moment from 'moment';

const pad0 = num => (num < 10 ? `0${num}` : `${num}`);

class Countdown extends Component {
  state = { next: null };

  componentDidMount() {
    this.updateNextState();
  }

  componentWillReceiveProps({ start }) {
    if (start !== this.props.start) {
      this.setState(
        {
          next: moment.duration(start)
        },
        this.updateNextState.bind(this)
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timeout = null;

  updateNextState() {
    const prev = this.state.next || moment.duration(this.props.start);

    const secs = prev.asSeconds();

    if (secs - 1 > 0) {
      const next = moment.duration(secs - 1, 'seconds');

      this.setState({
        next
      });

      this.props.onChange(next);

      clearTimeout(this.timeout);

      this.timeout = setTimeout(this.updateNextState.bind(this), 1000);
    } else {
      this.setState({
        next: null
      });

      this.props.onEnd();
    }
  }

  render() {
    const { next } = this.state;

    const { format } = this.props;

    return (
      <React.Fragment>
        {next
          ? format
              .replace('ss', pad0(next.seconds()))
              .replace('s', next.seconds())
              .replace('mm', pad0(next.minutes()))
              .replace('m', next.minutes())
              .replace('hh', pad0(next.hours()))
              .replace('h', next.hours())
          : null}
      </React.Fragment>
    );
  }
}

Countdown.propTypes = {
  start: PT.string,
  format: PT.string,
  onEnd: PT.func,
  onChange: PT.func
};

Countdown.defaultProps = {
  start: '0:0:60',
  format: 's',
  onEnd: () => {},
  onChange: () => {}
};

export default Countdown;
