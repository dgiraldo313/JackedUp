import React, { Component } from 'react';

// creates dynamic button with different names depending on state of workout

class WorkoutControls extends Component {
  constructor(props) {
    super(props);
  }

  message() {
    let message;
    if (this.props.state === 'INITIAL') {
      message = 'start';
    }else if (this.props.finish) {
      // add finish button right before workout ends
      message = 'finish';
    }else if (this.props.state === 'INPROGRESS') {
      message = 'next';
    }else if (this.props.state === 'STOPPED') {
      message = 'continue';
    }

    return message;
  }

  addControls() {
    let controls;
    if (this.props.state === 'INPROGRESS' && !this.props.finish) {
      controls = <button className="secondary" onClick={ this.props.pause }>
        <i className="fa fa-pause" aria-hidden="true"></i>
      </button>;
    }else if (this.props.state === 'STOPPED') {
      controls = <button className="secondary" onClick={ this.props.reset }>
        <i className="fa fa-refresh" aria-hidden="true"></i>
      </button>;
    }

    return controls;

  }

  render() {
    let message = this.message();
    return (
      <div className='controls'>
        <button className={ 'primary' + ' ' + message}
                onClick={ this.props.nextCard }>{ message }</button>
        { this.addControls() }
      </div>

    );
  }

}

export default WorkoutControls;
