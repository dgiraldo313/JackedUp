import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: 0,
      previousTime: 0,
      running: false,
    };
    this.tick = this.onTick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    //once workout ends, record final time
    let state = { FinalTime: this.formattedTime() };
    this.props.refresh(state);

    //then clear initial interval
    clearInterval(this.interval);
  }

  onTick() {
    if (this.props.state === 'INPROGRESS' && this.state.running) {
      // when workout is in progress increment
      let now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    } else if (this.props.state === 'INPROGRESS' && !this.state.running) {
      // when state is changed to Workout on Progress and timer is not running already
      //change state to running
      this.setState({
        running: true,
        previousTime: Date.now(),
      });
    } else if (this.props.state === 'STOPPED') {
      // change state of running to false when workoutis stopped
      this.setState({
        running: false,
      });
    } else if (this.props.state === 'INITIAL' && this.state.elapsedTime !== 0) {
      // Resets timer back to 0 if another workout is started
      this.setState({
        elapsedTime: 0,
      });
    } else if (this.props.state === 'FINISHED') {
      console.log(this.props);
    }
  }

  strPadLeft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  // formattedTime(minutes, seconds) {
  //   return (this.strPadLeft(minutes, '0', 2) + ':' + this.strPadLeft(seconds, '0', 2));
  // }

  formattedTime() {
    // return formatted time
    let time = Math.floor(this.state.elapsedTime / 1000);
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return (this.strPadLeft(minutes, '0', 2) + ':' + this.strPadLeft(seconds, '0', 2));
  }

  render() {
    return (
      <div className="timer-container">
        <div className="hanger"></div>
        <div className="timer">
          <div className="stopwatch-time">{ this.formattedTime() }</div>
        </div>
      </div>
    );
  }

}

export default Timer;
